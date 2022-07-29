const promiseQuery = require("../promiseQuery")

/**
 * Get all managers with number of employees and the average salary of their employees
 * `INNER JOIN` ensures we only get employees that ARE managers
 * @returns DB query as promise
 */
function getManagerList() {
  return promiseQuery(`
    SELECT 
      managers.id, 
      managers.first_name, managers.last_name, 
      COUNT(employees.id) as number_employees, 
      AVG(roles.salary) as average_salary
    FROM employees managers
    INNER JOIN employees ON managers.id = employees.manager_id
    INNER JOIN roles ON roles.id = employees.role_id
    GROUP BY managers.id
  `)
}

module.exports = getManagerList