"use strict";

const { Pool } = require('pg');

const pool = new Pool({
  database: "todo",
  idleTimeoutMillis: 200, // close idle clients after 0.2 seconds
});

//Adds a task to the database
//Returns a Promise
exports.addTask = function(task){
  return new Promise(function(fulfull,reject){
    if(task == null || task == ""){
      reject(new Error("Task cannot be null or empty"));
      return;
    }
    pool.query("INSERT INTO list(task,is_completed) VALUES($1,'0')",[task])
      .then(function(res){
        if(res.rowCount != 0){
          fulfull();
        }
        else{
          reject(new Error("Couldn't add task to database"));
        }
      })
      .catch(function(err){
        reject(err);
      });
  });
};

//Mark a task as completed
//Returns a Promise
exports.completeTask = function(idToComplete){
  return new Promise(function(fulfill, reject){
    if(idToComplete == null){
      reject(new Error("Must supply a task id to complete."));
      return;
    };
    pool.query("UPDATE list SET is_completed='true' WHERE id=$1",[idToComplete])
      .then(function(res){
        if(res.rowCount != 0){
          fulfill();
        }
        else{
          reject(new Error("No task with id " + idToComplete + " exists, try again."));
        }
      })
      .catch(function(err){
        reject(err);
      });
  })
};

//Deletes a task from the database
//Returns a Promise
exports.deleteTask = function(idToDelete){
  return new Promise(function(fulfill, reject){
    if(idToDelete == null){
      reject(new Error("Must supply a task id to delete."));
      return;
    };
    pool.query("DELETE FROM list WHERE id=$1",[idToDelete])
      .then(function(res){
        if(res.rowCount != 0){
          fulfill();
        }
        else{
          reject(new Error("No task with id " + idToDelete + " exists, try again."));
        }
      })
      .catch(function(err){
        reject(err);
      });
  });
};

exports.getAllTasks = function(){
  return new Promise(function (fulfill, reject){
    pool.query("SELECT * FROM list ORDER BY id asc",[],function(err,res){
      if (err)
        reject(err);
      else
        fulfill(res.rows);
    });
  });
}
