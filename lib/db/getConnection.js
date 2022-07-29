const mysql = require('mysql2')

/**
 * Check global reference for connection
 */
const connection = global.connection

/**
 * Connection helper method
 * Stores connection in global context to prevent opening multiple connections
 * @returns mysql connection
 */
function getConnection() {
  /** if connection exists in global context return that connection */
  if (connection) return connection
  else {
    /** Create a new connection */
    let newConnection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    })
    /** Store the new connection in the global context */
    global.connection = newConnection
    return newConnection
  }
}

module.exports = getConnection