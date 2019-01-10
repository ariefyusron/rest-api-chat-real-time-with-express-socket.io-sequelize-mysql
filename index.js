const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const validator = require('express-validator')

//mine
const route = require('./app/routes')

//app setup
const app = express()
const port = process.env.PORT
const server = app.listen(port,() => {
  console.log('Listening on '+port)
})

//socket setup
const io = socket(server)

//middleware
app.use((req, res, next) => {
  res.io = io;
  next();
});

//app
app.use(bodyParser.json())
app.use(validator())
app.use(route)