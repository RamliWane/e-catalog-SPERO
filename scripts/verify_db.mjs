// Safe DB connectivity test for e-catalog-spero.
// Loads DATABASE_URL from the project .env (already masked in file) and
// verifies the server is reachable. Prints ONLY the database name and
// the result reason — never prints user, host, or password.
import dotenv from "dotenv";
import path from "path";
import mysql from "mysql2/promise";

const projectRoot = "C:/my-project/e-catalog-spero";
dotenv.config({ path: path.join(projectRoot, ".env") });

const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) {
  console.log("RESULT=CONNECTION_FAILED reason=DATABASE_URL_missing");
  process.exit(1);
}

// Extract only the database name from the connection string.
const dbName = rawUrl.substring(rawUrl.lastIndexOf("/") + 1);

const pool = mysql.createPool(rawUrl);

let conn;
try {
  conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT 1 AS ok, DATABASE() AS current_db");
  console.log("RESULT=CONNECTION_OK db=" + dbName + " value=" + JSON.stringify(rows[0]));
  conn.release();
  await pool.end();
} catch (err) {
  console.log("RESULT=CONNECTION_FAILED reason=" + err.code + " message=" + err.message);
  process.exit(1);
}
