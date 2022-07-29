const promiseQuery = require("../promiseQuery")

/**
 * Gets all departments with number of employees and number of roles
 * `LEFT JOIN roles` ensures we get departments without any roles
 * `LEFT JOIN employees` ensures we get departments without any employees
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
    INNER JOIN departments ON departments.id = roles.department_id
    GROUP BY departments.id
`)
}

module.exports = getDepartmentList