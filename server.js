const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const path = require('path')
// const Datastore = require('nedb')
const {signin , requireSignin} = require('./routes/auth/auth.js');
const { addOffer } = require('./routes/offers/add.js');
const { setCompleted } = require('./routes/offers/setCompleted.js');
const { getAllOffers } = require('./routes/offers/getAll.js');
const { getTimeOffers } = require('./routes/offers/getTimeOffers.js')
const { getEditPage } = require('./routes/offers/getEdit.js');
const { applyEdit } = require('./routes/offers/applyEdit.js');
const { sendSms } = require('./routes/sms/sendSms.js');
const { getBalance } = require('./routes/sms/getBalance.js');
const { computeExcelAbroad } = require('./routes/excel/abroad.js');
const { computeExcelTimologio } = require('./routes/excel/timologio.js');

// const { dirname } = require('path');

const app = express();
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening at ${port}`));

app.use(cookieParser());
app.use(requireSignin)
app.use(express.static('./public'));
// app.use(express.static('./login'))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit:'50mb'
}))

// const db = new Datastore('../trackSales/database.db')

app.post('/api/offers/add', addOffer)
app.post('/api/sms/send', sendSms)
app.get('/api/sms/balance', getBalance)
app.get('/api/offers/setcompleted',setCompleted)
app.get('/api/offers', getAllOffers)
app.get('/api/offers/timeline', getTimeOffers)
app.get('/offers/edit', getEditPage)
app.post('/api/offers/edit',applyEdit)
app.post('/api/login', signin)
app.post('/api/abroad', computeExcelAbroad)
app.post('/api/timologio', computeExcelTimologio)
app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, './login/login.html'))
})