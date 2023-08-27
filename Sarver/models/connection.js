
const { Pool } = require("pg");
const pgp = require("pg-promise")();
require("dotenv").config();

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD_POSTGRES,
  port: process.env.DATABASE_PORT,
};

const db = new Pool(dbConfig);
const PGP = pgp(dbConfig);

// Export the pool for database operations
module.exports = {
  db,
  PGP
};
