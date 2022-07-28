const promiseQuery = require("../promiseQuery")

function getDepartmentList() {
  return promiseQuery(`
    SELECT departments.id, departments.name, COUNT(employees.id) as number_employees, COUNT(roles.id) as number_roles
    FROM departments
    LEFT JOIN roles ON roles.department_id = departments.id
    LEFT JOIN employees ON employees.id = roles.id
    GROUP BY departments.id
`)
}

module.exports = getDepartmentList