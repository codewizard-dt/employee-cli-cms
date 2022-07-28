const promiseQuery = require("../promiseQuery")

function deleteDepartment(department_id) {
  return promiseQuery(`
    DELETE FROM departments
    WHERE id = ?
  `, department_id)
}

module.exports = deleteDepartment