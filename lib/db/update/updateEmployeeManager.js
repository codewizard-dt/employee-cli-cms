const promiseQuery = require("../promiseQuery")

/**
 * Updates an employee with the given manager_id
 * @param {obj} keys an object that specifies the keys to use
 * @returns DB query as promise
 */
function updateEmployeeManager({ employee_id, manager_id }) {
  return promiseQuery(`
    UPDATE employees
    SET manager_id = ?
    WHERE id = ?
  `, [manager_id, employee_id])
}

module.exports = updateEmployeeManager