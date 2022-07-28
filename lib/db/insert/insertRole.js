const promiseQuery = require("../promiseQuery")

function insertRole({ title, salary, department_id }) {
  return promiseQuery(`
    INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)
  `, [title, salary, department_id])

}

module.exports = insertRole