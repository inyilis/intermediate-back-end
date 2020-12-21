const { Pool } = require('pg');

const db = new Pool({
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
});

module.exports = db;
