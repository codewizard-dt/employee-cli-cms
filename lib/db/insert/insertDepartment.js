const promiseQuery = require("../promiseQuery")

function insertDepartment({ name }) {
  return promiseQuery(`
    INSERT INTO departments (name)
    VALUES (?)
  `, name)
}

module.exports = insertDepartment