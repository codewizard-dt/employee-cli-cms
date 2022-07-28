const required = async (input) => !input || input === '' ? 'Required' : true

module.exports = required