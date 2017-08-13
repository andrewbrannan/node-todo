"use strict";

var argv = require('minimist')(process.argv.slice(2));



if(argv._.length == 0){
  printHelp();
  process.exit(0);
}

switch(argv._[0]){
    case "add":
      break;
    case "list":
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
      process.exit(0);

}

function printHelp(){
  console.log("~~~~~~~~~~TODO HELP~~~~~~~~~~~");
  console.log("");
  console.log("add <task>:     Add a task to the list");
  console.log("list:           List all tasks");
  console.log("complete <int>: Mark given task as complete");
  console.log("delete <int>:   Delete given task from list");
}
