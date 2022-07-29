const promiseQuery = require("../promiseQuery")

/**
 * Updates an employee with the given role_id
 * @param {obj} keys an object that specifies the keys to use
 * @returns DB query as promise
 */
function updateEmployeeRole({ employee_id, role_id }) {
  return promiseQuery(`
    UPDATE employees
    SET role_id = ?
    WHERE id = ?
  `, [role_id, employee_id])
}

module.exports = updateEmployeeRole