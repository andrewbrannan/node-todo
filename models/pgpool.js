"use strict"

const { Pool } = require('pg');

const pool = new Pool({
  database: "todo",
  idleTimeoutMillis: 200
});

module.exports = pool;
