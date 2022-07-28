const promiseQuery = require("../promiseQuery")

/**
 * Gets employees supervised by a specific manager including role and department names
 * `LEFT JOIN` ensures we get all employees
 * @param {number} manager_id 
 * @returns DB query as promise
 */
function getEmployeesByManagerId(manager_id) {
  return promiseQuery(`
    SELECT 
      employees.id, 
      first_name, 
      last_name, 
      name as department, 
      title, 
      salary 
    FROM employees
    LEFT JOIN roles ON roles.id = employees.role_id
    LEFT JOIN departments on departments.id = roles.department_id
    WHERE manager_id = ?
  `, manager_id)
}

module.exports = getEmployeesByManagerId