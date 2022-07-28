const promiseQuery = require("../promiseQuery")

/**
 * `manager` is constructed from multiple name columns
 * `LEFT JOIN employees managers` ensures we include employees without managers
 * `LEFT JOIN roles` ensures we include employees without roles (even tho they don't exist)
 * @param {number} department_id 
 * @returns DB query as promise
 */
function getEmployeesByDepartmentId(department_id) {
  return promiseQuery(`
    SELECT employees.id, 
      employees.first_name, 
      employees.last_name, 
      roles.title,
      roles.salary,
      CONCAT(managers.first_name, ' ', managers.last_name) as manager
    FROM employees
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    LEFT JOIN roles ON roles.id = employees.role_id
    WHERE roles.department_id = ?
  `, department_id)
}

module.exports = getEmployeesByDepartmentId