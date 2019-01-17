//initialize modul
const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const Sequelize = require('sequelize')

//mine
const route = require('./app/routes')

//app setup
const app = express()
const port = process.env.PORT
const server = app.listen(port,() => {
  console.log('Listening on '+port)
})

//socket
const io = socket(server)


//sequelize
const Op = Sequelize.Op

//middleware for all
app.use(cors())
app.use((req, res, next) => {
  res.Op = Op
  res.io = io;
  next();
});

//app
app.use(bodyParser.json())
app.use(validator())
app.use(route)
