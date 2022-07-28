const promiseQuery = require("../promiseQuery")

function deleteEmployee(employee_id) {
  return promiseQuery(`
    DELETE FROM employees
    WHERE id = ?
  `, employee_id)
}

module.exports = deleteEmployee