const getConnection = require("./getConnection");

const db = getConnection()

function getRoleList() {
  return db.promise().query(`
    SELECT roles.id, title, departments.name as department, salary, COUNT(employees.id) as num_employees
    FROM roles
    INNER JOIN employees ON employees.role_id = roles.id
    INNER JOIN departments on departments.id = roles.department_id
    GROUP BY roles.id
  `).then(([result]) => result).catch(error => error)
}

module.exports = getRoleList