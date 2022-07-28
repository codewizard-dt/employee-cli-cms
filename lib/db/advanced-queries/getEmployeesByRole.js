const promiseQuery = require("../promiseQuery")

/**
 * Gets employees with a specific role including manager name
 * `LEFT JOIN` ensures we get all employees
 * @param {number} role_id 
 * @returns DB query as promise
 */
function getEmployeesByRoleId(role_id) {
  return promiseQuery(`
    SELECT 
      employees.id, 
      employees.first_name, 
      employees.last_name, 
      CONCAT(managers.first_name, ' ', managers.last_name) as manager
    FROM employees
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    WHERE employees.role_id = ?;
  `, role_id)
}

module.exports = getEmployeesByRoleId