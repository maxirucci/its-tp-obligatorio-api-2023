const mysql = require('mysql2')

const conexion = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME ,
  password: process.env.MYSQL_PASS ,
  database: process.env.MYSQL_DB ,
})

module.exports = conexion.promise()