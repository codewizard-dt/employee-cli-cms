const promiseQuery = require("../promiseQuery")

function updateEmployeeManager({ employee_id, manager_id }) {
  return promiseQuery(`
    UPDATE employees
    SET manager_id = ?
    WHERE id = ?
  `, [manager_id, employee_id])
}

module.exports = updateEmployeeManager