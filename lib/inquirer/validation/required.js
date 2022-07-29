
/**
 * Validates that the user enters SoMeThInG
 * ie, not undefined and not an empty string
 * @param {string} input user input from inquirer
 * @returns error message or `true`
 */
const required = async (input) => !input || input === '' ? 'Required' : true

module.exports = required