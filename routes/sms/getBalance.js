const fetch = require('node-fetch')

exports.getBalance = async (req, res) => {

  let parameters = {
    'key' : process.env.EASY_API_KEY,
    'type' : 'json'
  }

  var esc = encodeURIComponent;
  var query = Object.keys(parameters)
      .map(k => esc(k) + '=' + esc(parameters[k]))
      .join('&');

  let url = 'https://easysms.gr/api/me/balance' + '?' + query

  const response = await fetch(url)
  const data = await response.json()
  const balance = data.balance
  res.json({'balance':balance})
}