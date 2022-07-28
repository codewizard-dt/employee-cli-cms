const promiseQuery = require("../promiseQuery");

function getEmployeeList() {
  return promiseQuery(`
    SELECT employees.id, 
          employees.first_name, 
          employees.last_name, 
          departments.name as department,
          roles.title as role, 
          roles.salary as salary,
          CONCAT(managers.first_name, ' ', managers.last_name) as manager
    FROM employees
    LEFT JOIN roles ON roles.id = employees.role_id
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    LEFT JOIN departments ON departments.id = roles.department_id
    ORDER BY departments.id;
  `)
}

module.exports = getEmployeeList