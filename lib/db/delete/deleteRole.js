const promiseQuery = require("../promiseQuery")

/**
 * Deletes a role
 */
function deleteRole(role_id) {
  return promiseQuery(`
    DELETE FROM roles
    WHERE id = ?
  `, role_id)
}

module.exports = deleteRole