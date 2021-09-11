const express = require('express');
const router = express.Router();

const pg = require('pg');
const pool = new pg.Pool({
    database: 'to-do-list', // database name
    host: 'localhost', // Where is your database running?
    port: '5432', // default port
    max: 10, // Max number of queries at one time
    idleTimeoutMillis: 30000 // 30 seconds
});

module.exports = router;