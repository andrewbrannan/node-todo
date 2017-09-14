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

// This is wrong, need to re-jig
exports.createUser = function(user_id, password){
  bcrypt.hash(password, SALT_ROUNDS)
    .then(function(hash){
      return new Promise(function(fulfill, reject){
        pool.query("INSERT INTO users(user_id,hash,is_admin) VALUES($1, $2, false)", [user_id, hash])
          .then(function(res){
            if(res.rowCount != 0){
              fulfill();
            }
            else{
              reject(new Error("Error adding user to database"));
            }
          })
          .catch(function(err){
            reject(err);
          });
      });
    });
};

exports.isUserAdmin = function(user_id){
  return new Promise(function(fulfull,reject){
    pool.query("SELECT is_admin FROM users WHERE user_id=$1",[user_id])
      .then(function(res){
        if(res.rowCount != 0){
          fulfull(res.is_admin);
        }
        reject(new Error("User does not exist"));
      })
      .catch(function(err){
        reject(err);
      });
  });
};
