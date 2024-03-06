// import { v4 as uuidv4 } from "uuid";

const { Pool } = require("pg");

require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

async function getPgVersion() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT version()");

    console.log(result.rows[0]);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

getPgVersion();

// const { Pool } = require("pg");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   user: PGUSER, // Changed from username to user
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: {
//     require: true,
//   },
// });

// async function createPersonTable() {
//   const client = await pool.connect();

//   try {
//     // Use uuid_generate_v4() function to generate UUIDs
//     await client.query(`
//       CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
//       CREATE TABLE person (
//         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         name VARCHAR(50)
//       )
//     `);
//     console.log("Person table created successfully");
//   } catch (error) {
//     console.error("Error creating person table:", error);
//   } finally {
//     client.release();
//   }
// }

// createPersonTable();
