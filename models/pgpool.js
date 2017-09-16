"use strict"

const { Pool } = require('pg');
const config = require('../config.js')
const url = require('url')

const params = url.parse(config.db_url);
const auth = params.auth.split(':');

const pg_config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: false
};

console.log(config.db_url)
console.log(pg_config)

const pool = new Pool(pg_config,{
  idleTimeoutMillis: 200
});

module.exports = pool;
