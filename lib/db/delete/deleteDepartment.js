const promiseQuery = require("../promiseQuery")

/** 
 * Deletes a department
*/
function deleteDepartment(department_id) {
  return promiseQuery(`
    DELETE FROM departments
    WHERE id = ?
  `, department_id)
}

module.exports = deleteDepartment