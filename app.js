"use strict";

var argv = require('minimist')(process.argv.slice(2));
const { Pool } = require('pg'); // What's with the { } around Pool?

const pool = new Pool();

//SQL Queries - Is there a better way to do this?
const addQueryText = "INSERT INTO list(task,is_completed) VALUES($1,'0')";
const listQueryText = "SELECT * FROM list ORDER BY id asc";
const setCompletedQueryText = "UPDATE list SET is_completed='true' WHERE id=$1";
const deleteQueryText = "DELETE FROM list WHERE id=$1";
const alterSequenceQueryText = "ALTER SEQUENCE list_id_seq RESTART WITH 1";
const updateIdsQueryText = "UPDATE list SET id=nextval('list_id_seq')";

function printHelp(){
  console.log("~~~~~~~~~~TODO HELP~~~~~~~~~~~");
  console.log("");
  console.log("add <task>:     Add a task to the list");
  console.log("list:           List all tasks");
  console.log("complete <int>: Mark given task as complete");
  console.log("delete <int>:   Delete given task from list");
}

//Print a single task row
function printRow(row){
  process.stdout.write("   " + row.id + " ");
  for(var i = 0; i < 4-row.id.toString().length; i++){
    process.stdout.write(" ");
  }
  process.stdout.write("[");
  if(row.is_completed){
    process.stdout.write("X");
  }
  else{
    process.stdout.write(" ");
  }
  process.stdout.write("]     " + row.task + "\r\n");
}

//Adds a task to the database
function addTask(task){
  if(task == null || task == ""){
    console.log("Must supply a task name to add.");
    process.exit(0);
  }
  pool.query(addQueryText,[task],function(err,res){
    if(err){
      console.log(err);
      process.exit(1)
    }
    else{
      console.log("Added todo: " + task)
      process.exit(0)
    }
  });
}

//Prints a list of all tasks in the database
function listTasks(){
  pool.query(listQueryText,[],function(err,res){
    if(err){
      console.log(err);
      process.exit(1);
    }
    console.log("  id | status | task")
    res.rows.forEach(function(row){
      printRow(row);
    });
    process.exit(0);
  });
}

//Deletes a task from the database
function deleteTask(idToDelete){
  if(idToDelete == null){
    console.log("Must supply a task id to delete.");
    process.exit(0);
  }
  pool.query(deleteQueryText,[idToDelete],function(err,res){
    if(err){
      console.log(err);
      process.exit(1);
    };
    if(res.rowCount != 0){
      //After the row has been deleted, recalcualte the id column so it's continuous
      //Would be good to avoid multiple queries on this, I think a postgres transaction would be the right tool
      pool.query(alterSequenceQueryText,[],function(err,res){
        if(err){
          console.log(err);
          process.exit(1);
        };
        pool.query(updateIdsQueryText,[],function(err,res){
          if(err){
            console.log(err);
            process.exit(1);
          };
          console.log("Deleted task " + idToDelete);
          process.exit(0);
        });
      });
    }
    else{
      console.log("No task with id " + idToDelete + " exists, try again.");
      process.exit(0);
    }
  });
}

//Mark a task as completed
function completeTask(idToComplete){
  if(idToComplete == null){
    console.log("Must supply a task id to complete.");
    process.exit(0);
  }
  pool.query(setCompletedQueryText,[idToComplete],function(err,res){
    if(err){
      console.log(err);
      process.exit(1);
    };
    if(res.rowCount != 0){
      console.log("Set task " + idToComplete + " as completed.");
    }
    else{
      console.log("No task with id " + idToComplete + " exists, try again.");
    }
    process.exit(0);
  });
}

if(argv._.length == 0){
  printHelp();
  process.exit(0);
}

switch(argv._[0]){
    case "add":
      const task = argv._[1];
      addTask(task);
      break;

    case "list":
      listTasks();
      break;

    case "delete":
      const idToDelete = argv._[1];
      deleteTask(idToDelete);
      break;

    case "complete":
      const idToComplete = argv._[1];
      completeTask(idToComplete);
      break;

    case "help":
      printHelp();
      break;

    default:
      console.log("Invalid Argument.")
      printHelp();
}
