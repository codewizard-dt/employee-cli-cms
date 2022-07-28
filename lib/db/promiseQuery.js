const getConnection = require("./getConnection");

const db = getConnection()

function promiseQuery(...queryArgs) {
  return db.promise().query(...queryArgs)
    // Pulls out the first item of the response array (ie the table data)
    .then(([result]) => result)
    // Logs any error but returns `undefined`
    .catch(err => { console.error(err) })
}

module.exports = promiseQuery