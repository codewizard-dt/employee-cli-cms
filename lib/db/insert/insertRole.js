const promiseQuery = require("../promiseQuery")

/**
 * Creates a new role in the database
 * @param {obj} roleProps
 * @returns DB query as promise
 */
function insertRole({ title, salary, department_id }) {
  return promiseQuery(`
    INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)
  `, [title, salary, department_id])

}

module.exports = insertRole