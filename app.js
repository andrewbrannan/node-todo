"use strict";

var argv = require('minimist')(process.argv.slice(2));

const db = require('./db/db.js')

function printHelp(){
  console.log("~~~~~~~~~~TODO HELP~~~~~~~~~~~");
  console.log("");
  console.log("add <task>:     Add a task to the list");
  console.log("list:           List all tasks");
  console.log("complete <int>: Mark given task as complete");
  console.log("delete <int>:   Delete given task from list");
}

//Print a single task row
function printRows(rows){
  rows.forEach(function(row){
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
  });
}

if(argv._.length == 0){
  printHelp();
  process.exit(0);
}

switch(argv._[0]){
    case "add":
      const task = argv._[1];
      db.addTask(task);
      break;

    case "list":
      console.log("  id | status | task")
      db.getAllTasks()
        .then(printRows)
        .catch(function(err){
          console.log(err);
        });
      break;

    case "delete":
      const idToDelete = argv._[1];
      db.deleteTask(idToDelete);
      break;

    case "complete":
      const idToComplete = argv._[1];
      db.completeTask(idToComplete);
      break;

    case "help":
      printHelp();
      break;

    default:
      console.log("Invalid Argument.")
      printHelp();
}
