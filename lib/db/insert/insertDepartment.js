const promiseQuery = require("../promiseQuery")

/**
 * Creates a new department in the database
 * @param {obj} departmentProps
 * @returns DB query as promise
 */
function insertDepartment({ name }) {
  return promiseQuery(`
    INSERT INTO departments (name)
    VALUES (?)
  `, name)
}

module.exports = insertDepartment