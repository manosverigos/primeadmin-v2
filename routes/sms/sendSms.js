const fetch = require('node-fetch')
const { messageResponse } = require('../../html_templates/messageResponse')

exports.sendSms = async (req, res) => {
  const data = req.body
  const recipients = data.recipients
  const text = data.text

  let rec_list = recipients.split('\r\n')


  let parameters = {
    'key' : process.env.EASY_API_KEY,
    'text' : text,
    'from': 'Prime',
    'type' : 'json'
  }

  var esc = encodeURIComponent;
  var query = Object.keys(parameters)
      .map(k => esc(k) + '=' + esc(parameters[k]))
      .join('&');

  let url = 'https://easysms.gr/api/sms/bulk' + '?' + query

  for (rec of rec_list){
    url += `&to[]=${rec}`
  }

  console.log(url)

  const response = await fetch(url)
  const easysms_data = await response.json()

  let htmlResponse = messageResponse(easysms_data)
  res.setHeader('Content-type', 'text/html')
  res.send(htmlResponse)
}
