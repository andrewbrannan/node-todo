"use strict";

const { Pool } = require('pg');

const pool = new Pool({
  database: "todo",
  idleTimeoutMillis: 200, // close idle clients after 0.2 seconds
});

//Adds a task to the database
//Returns true if added successfully, false if not
exports.addTask = function(task){
  if(task == null || task == ""){
    console.log("Must supply a task name to add.");
    return;
  };
  pool.query("INSERT INTO list(task,is_completed) VALUES($1,'0')",[task])
    .then(function(res){
      console.log("Added todo: " + task)
    })
    .catch(function(err){
      console.log(err);
    });
};

//Mark a task as completed
//True if task was completed successfully
exports.completeTask = function(idToComplete){
  if(idToComplete == null){
    console.log("Must supply a task id to complete.");
    return;
  };
  pool.query("UPDATE list SET is_completed='true' WHERE id=$1",[idToComplete])
    .then(function(res){
      if(res.rowCount != 0){
        console.log("Set task " + idToComplete + " as completed.");
      }
      else{
        console.log("No task with id " + idToComplete + " exists, try again.");
      }
    })
    .catch(function(err){
      console.log(err);
    });
};

//Deletes a task from the database
//True if the task was deleted correctly, false if not
exports.deleteTask = function(idToDelete){
  if(idToDelete == null){
    console.log("Must supply a task id to delete.");
    return;
  };
  pool.query("DELETE FROM list WHERE id=$1",[idToDelete])
    .then(function(res){
      if(res.rowCount != 0){
        console.log("Deleted task " + idToDelete);
      }
      else{
        console.log("No task with id " + idToDelete + " exists, try again.");
      }
    })
    .catch(function(err){
      console.log(err);
    });
};

//Returns an array of rows in the table
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
