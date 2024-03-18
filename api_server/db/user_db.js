// const mysql=require("mysql2");
import mysql from "mysql2";
import { checkIfExists, addColumnIfNotExists } from "../utils/hook.js";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "wjw18986797752",
  database: "my_db_01",
});

console.log("连接成功");

const db = pool.promise();

async function initTable() {
  // 删除users表
  // const dropTableQuery = "DROP TABLE IF EXISTS users";
  // const [result] = await db.query(dropTableQuery)
  // console.log(result);

  const createUserTable =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY)";

  const [createTableResult] = await db.query(createUserTable);
  // console.log(createTableResult.warningStatus)

  await addColumnIfNotExists("users", "userName", "VARCHAR(255)");
  await addColumnIfNotExists("users", "password", "VARCHAR(255)");
  await addColumnIfNotExists("users", "phoneNumber", "VARCHAR(255)");

  // 删除 movies 表
//   const dropTableQuery = "DROP TABLE IF EXISTS movies";
//   const [result] = await db.query(dropTableQuery)
//   console.log(result);

  const createUserMoviesTable = `CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )`;

  const [createUserMovieTableResult] = await db.query(createUserMoviesTable);

  await addColumnIfNotExists("movies", "movieName", "VARCHAR(255)");
  await addColumnIfNotExists("movies", "imgUrl", "VARCHAR(255)");
  await addColumnIfNotExists("movies", "movieUrl", "VARCHAR(255)");
  

}

initTable();

export default pool.promise();
