const promiseQuery = require("../promiseQuery")

/**
 * Creates a new employee in the database
 * @param {obj} employeeProps 
 * @returns DB query as promise
 */
function insertEmployee({ first_name, last_name, role_id, manager_id }) {
  return promiseQuery(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)
  `, [first_name, last_name, role_id, manager_id])
}

module.exports = insertEmployee