import mysql from "mysql"
import dotevn from "dotenv"
dotevn.config()

// createing connnection to the mysql database
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

export default db