/**
 * Validates that inquirer input is a number
 * @param {string} input user input from inquirer
 * @returns an error message or `true`
 */
const isNumber = async (input) => Number.isNaN(Number(input)) ? 'Must be a number' : true

module.exports = isNumber