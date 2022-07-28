
/**
 * Creates a method to easily format currency values
 */
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

module.exports = currency