const required = require("./validation/required.js")

/**
 * Creates a new question object 
 * @param {string} name data key for the question
 * @param {string} type type of prompt
 * @param {string} message message displayed to user
 * @param {object} otherOptions all other options for the given question
 * @returns an object ready for injection into the `inquirer.prompt` command
 */
const newQuestion = (name, type, message, otherOptions = {}) => {
  return { name, type, message, when: true, validate: required, ...otherOptions }
}

module.exports = newQuestion