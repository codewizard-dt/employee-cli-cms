const mysql = require('mysql2')
const connection = global.connection

function getConnection() {
  if (connection) return connection
  else {
    let newConnection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    })
    global.connection = newConnection
    return newConnection
  }
}

module.exports = getConnection