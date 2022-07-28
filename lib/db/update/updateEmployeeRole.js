const promiseQuery = require("../promiseQuery")

function updateEmployeeRole({ employee_id, role_id }) {
  return promiseQuery(`
    UPDATE employees
    SET role_id = ?
    WHERE id = ?
  `, [role_id, employee_id])
}

module.exports = updateEmployeeRole