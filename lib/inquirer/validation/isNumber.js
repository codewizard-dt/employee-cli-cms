const isNumber = async (input) => Number.isNaN(Number(input)) ? 'Must be a number' : true

module.exports = isNumber