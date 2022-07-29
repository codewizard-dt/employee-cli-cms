const currency = require("../../numberFormat")

/**
 * Generates a map function to format the given keys as currency
 * @param  {...any} key_names any key names that you would like formatted
 * @returns a function to use inside `Array.map`
 */
function mapCurrency(...key_names) {
  /** Returns a function */
  return function (obj) {
    for (let key_name of key_names) {
      /** If the key exists, format it */
      if (obj[key_name]) obj[key_name] = currency.format(obj[key_name])
    }
    /** Return the obj being mapped */
    return obj
  }
}

module.exports = mapCurrency