"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var jwt = require('jsonwebtoken');
var jwt_express = require('express-jwt');


var list = require('../models/todo-list.js')
var users = require('../models/users.js')

var config = require("../config.js")

//Log all the requests to the console
router.use(function(req,res,next){
  console.log('New request on: ' + req.path + ' Method: '+  req.method);
  next();
});

router.use('/tasks',jwt_express({secret: config.jwtsecret}), function(req,res, next){
  if(!req.user){
    return res.sendStatus(401);
  };
  next();
});

//TODO: What if the json here is invalid, should I try to catch the error?
router.use(bodyParser.json())

router.post('/tasks', function(req, res){
  var data = req.body;
  //Check that request contains the task key
  if(!data.task){
    res.json({
      message:"No task to add"
    });
    res.status(400).end();
  };

  list.addTask(data.task)
    .then(function(){
      console.log("Added task \"" + data.task + "\" to list")
      res.status(204).end();
    })
    .catch(function(err){
      console.log(err);
      res.status(500).end();
  });
});

router.delete('/tasks/:id', function(req, res){
  list.deleteTask(req.params.id)
    .then(function(){
      console.log("Deleted task " + req.params.id);
      res.status(204).end();
    })
    .catch(function(err){
      // TODO: Get some feedback on how to handle errors.  This does what I want but feels messy
      // But maybe it doesn't matter if we try to delete a task that doesn't exist?  But then we're failing silently...
      console.log(err);
      if(err.code = list.ERROR_CODE_TASK_DOES_NOT_EXIST){
        res.json({
          message:"Task does not exist"
        });
        res.status(404).end();
      }
      res.status(500).end();
  });
});

router.put('/tasks/complete/:id', function(req, res){
  list.completeTask(req.params.id)
    .then(function(){
      console.log("Set task " + req.params.id + " as completed.");
      res.status(204).end();
    })
    .catch(function(err){
      console.log(err);
      if(err.code = list.ERROR_CODE_TASK_DOES_NOT_EXIST){
        res.json({
          message:"Task does not exist"
        });
        res.status(404).end();
      }
      res.status(500).end();
  });
});

router.get('/tasks', function(req, res){
  list.getAllTasks()
    .then(function(rows){
      //TODO: Should this respond with just an array or should it have a tasks key with value the array?
      var data = {};
      data.tasks = rows;
      res.json(data);
      res.status(204).end();
    })
    .catch(function(err){
      console.log(err);
      res.status(500).end();
  });
});

router.post('/login', function(req, res){
  //Check username and pw against database and if all good issue a token
  var data = req.body;

  if(!data.user_id || ! data.password){
    res.json({
      message:"Username and password must be specified"
    });
    res.status(400).end();
  };

  users.validateUser(data.user_id,data.password)
    .then(function(){
      var token = jwt.sign({ user_id: data.user_id }, config.jwtsecret,  {
          expiresIn: '14 days'
        });
      res.json({
        success: true,
        token: token
      });
      res.status(200).end();
    })
    .catch(function(err){
      res.json({
        success: false
      });
      res.status(401).end();
    });
});

//Give anything not explicitly routed a 404
router.use(function(req,res,next){
  res.status(404).end();
});

exports.router = router;
