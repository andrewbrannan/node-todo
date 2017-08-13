"use strict";

var argv = require('minimist')(process.argv.slice(2));
const { Pool } = require('pg'); // What's with the { } around Client?

const pool = new Pool();

//SQL Queries - Is there a better way to do this?
const addQueryText = "INSERT INTO list(task,done) VALUES($1,'0')"
const listQueryText = "SELECT * FROM list ORDER BY id asc"

function printHelp(){
  console.log("~~~~~~~~~~TODO HELP~~~~~~~~~~~");
  console.log("");
  console.log("add <task>:     Add a task to the list");
  console.log("list:           List all tasks");
  console.log("complete <int>: Mark given task as complete");
  console.log("delete <int>:   Delete given task from list");
}

if(argv._.length == 0){
  printHelp();
  process.exit(0);
}

switch(argv._[0]){
    case "add":
      const taskText = argv._[1];
      pool.query(addQueryText,[taskText],function(err,res){
        if(err){
          console.log(err);
          process.exit(1)
        }
        else{
          console.log("Added todo: " + taskText)
          process.exit(0)
        }
      });
      break;
    case "list":
      pool.query(listQueryText,[],function(err,res){
        if(err){
          console.log(err);
        }
        res.rows.forEach()
      })
      break;
    case "delete":
      break;
    case "complete":
      break;
    case "":
      console.log("NOTHING");
      break;

    default:
      console.log("Invalid Argument.")
      printHelp();

}
