const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "34.30.47.2",
  database: "reservoir_management",
  password: "bhuvi",
  port: 5432,
});

module.exports = pool;
