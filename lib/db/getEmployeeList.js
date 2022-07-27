const getConnection = require("./getConnection");

const db = getConnection()

function getEmployeeList() {
  return db.promise().query(`
    SELECT employees.id, 
          employees.first_name, 
          employees.last_name, 
          roles.title as role, 
          roles.salary as salary,
          departments.name as department
    FROM employees
    LEFT JOIN roles ON roles.id = employees.role_id
    LEFT JOIN departments ON departments.id = roles.department_id;
  `).then(([result]) => result).catch(error => error)
}

module.exports = getEmployeeList