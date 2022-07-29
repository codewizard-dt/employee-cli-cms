const getConnection = require("./getConnection");

const db = getConnection()

/**
 * Helper function to create query promises
 * @param  {...any} queryArgs 
 * @returns DB query as promise
 */
function promiseQuery(...queryArgs) {
  return db.promise().query(...queryArgs)
    // Pulls out the first item of the response array (ie the table data)
    .then(([result]) => result)
    // Logs any error but returns `undefined`
    .catch(err => { console.error(err) })
}

module.exports = promiseQuery