const currency = require("../../numberFormat")

function mapCurrency(...key_names) {

  return function (obj) {
    for (let key_name of key_names) {
      if (obj[key_name]) obj[key_name] = currency.format(obj[key_name])
    }
    return obj
  }
}

module.exports = mapCurrency