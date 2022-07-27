const getConnection = require("./getConnection");

const db = getConnection()

function getEmployeesByRoleId(role_id) {
  return db.promise().query(`
    SELECT employees.id, 
      employees.first_name, 
        employees.last_name, 
        CONCAT(managers.first_name, ' ', managers.last_name) as manager
    FROM employees
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    WHERE employees.role_id = ?;
  `, role_id).then(([result]) => result).catch(error => error)
}

module.exports = getEmployeesByRoleId