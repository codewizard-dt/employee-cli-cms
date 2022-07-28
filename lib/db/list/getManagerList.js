const promiseQuery = require("../promiseQuery")

function getManagerList() {
  return promiseQuery(`
    SELECT managers.id, managers.first_name, managers.last_name, COUNT(employees.id) as number_employees, AVG(roles.salary) as average_salary
    FROM employees managers
    INNER JOIN employees ON managers.id = employees.manager_id
    INNER JOIN roles ON roles.id = employees.role_id
    GROUP BY managers.id
  `)
}

module.exports = getManagerList