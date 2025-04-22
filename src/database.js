const { Pool } = require("pg");
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_db",
  password: "your_password",
  port: 5432,
});

async function saveToDatabase(data) {
  const client = await pool.connect();
  try {
    await client.query("INSERT INTO your_table (column1, column2) VALUES ($1, $2)", data);
  } finally {
    client.release();
  }
}
