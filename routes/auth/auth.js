const jwt = require('jsonwebtoken');
require('dotenv').config()
const path = require('path')

exports.signin = (req, res, next) => {
  if (req.body.username == process.env.USERNAME && req.body.pwd == process.env.PASSWORD) {
    const username = req.body.username
    const token = jwt.sign({
      username: username
    }, process.env.JWT_SECRET, {
      expiresIn: '365d'
    });
  
    res.cookie('token',
      token,{maxAge: 31536000000, httpOnly: true}
    )
    res.json({token})

  } else {
    return res.json({
      message: 'Λάθος στοιχεία'
    })
  }
}

exports.requireSignin = (req, res, next) => {
  // if(req.originalUrl == '/api/login'){
    if(req.originalUrl == '/login' || req.originalUrl == '/api/login'){
    console.log('login')
    return next()
  }

  if (req.cookies.token) {
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err){
        console.log(err)
        return res.redirect('/login')
      }
      return next()
    });
  } else {
    console.log('no token')
    return res.redirect('/login')
  }
}

