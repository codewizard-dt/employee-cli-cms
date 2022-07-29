const promiseQuery = require("../promiseQuery")

/** 
 * Deletes an employee
*/
function deleteEmployee(employee_id) {
  return promiseQuery(`
    DELETE FROM employees
    WHERE id = ?
  `, employee_id)
}

module.exports = deleteEmployee