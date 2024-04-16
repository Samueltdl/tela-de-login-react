require('dotenv').config();

async function connectDatabase(){

  if(global.connection){
    return global.connection.connect();
  }

  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });

  const client = await pool.connect();
  console.log("Successful connecting to the database.");

  const res = await client.query('select now()');
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
}

connectDatabase();