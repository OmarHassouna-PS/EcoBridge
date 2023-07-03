
const { Pool } = require("pg");
require("dotenv").config();

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD_POSTGRES,
  port: process.env.DATABASE_PORT,
};

const db = new Pool(dbConfig);

// Export the pool for database operations
module.exports = {
  db
};
