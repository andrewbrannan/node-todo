"use strict";

const pool = require('./pgpool.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

//Checks if a user exists in the database
//Returns a Promise
exports.validateUser = function(user_id, password){
  return new Promise(function(fulfull,reject){
    pool.query("SELECT hash FROM users WHERE user_id=$1",[user_id])
      .then(function(res){
        if(res.rowCount != 0){
          return bcrypt.compare(password, res.rows[0].hash); // This returns a promise
        }
        else{
          reject(new Error("Username not found"));
        }
      })
      .then(function(res){
        if(res){
          fulfull();
        }
        reject(new Error("Incorrect password"));
      })
      .catch(function(err){
        reject(err);
      });
  });
};
