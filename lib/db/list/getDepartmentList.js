const promiseQuery = require("../promiseQuery")

/**
 * Gets all departments with number of employees and number of roles
 * SELECT FROM employees ensures we count all employees
 * `INNER JOIN roles` ensures we get employees with roles
 * `RIGHT JOIN departments` ensures we get departments without employees
 * @returns DB query as promise
 */
function getDepartmentList() {
  return promiseQuery(`
    SELECT 
      departments.id, 
      departments.name,
      COUNT(employees.id) as number_employees, 
      COUNT(DISTINCT(roles.id)) as number_roles
    FROM employees
    INNER JOIN roles ON roles.id = employees.role_id
    RIGHT JOIN departments ON departments.id = roles.department_id
    GROUP BY departments.id
`)
}

module.exports = getDepartmentList