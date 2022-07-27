const getConnection = require("./getConnection");

const db = getConnection()

function getEmployeesByManagerId(manager_id) {
  return db.promise().query(`
    SELECT employees.id, first_name, last_name, name as department, title, salary FROM employees
    LEFT JOIN roles ON roles.id = employees.role_id
    LEFT JOIN departments on departments.id = roles.department_id
    WHERE manager_id = ?
  `, manager_id).then(([result]) => result).catch(error => error)
}

module.exports = getEmployeesByManagerId