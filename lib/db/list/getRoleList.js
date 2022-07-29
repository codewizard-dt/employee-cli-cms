const promiseQuery = require("../promiseQuery")

/**
 * Gets all roles with department name and number of employees with that role
 * `LEFT JOIN` ensures we get roles even if they are not assigned to any employees
 * @returns DB query as promise
 */
function getRoleList() {
  return promiseQuery(`
    SELECT 
      roles.id, 
      title, 
      departments.name as department, 
      salary, 
      COUNT(employees.id) as num_employees
    FROM roles
    LEFT JOIN employees ON employees.role_id = roles.id
    LEFT JOIN departments on departments.id = roles.department_id
    GROUP BY roles.id
    ORDER BY departments.id, salary DESC
  `)
}

module.exports = getRoleList