const express = require('express')
const socket = require('socket.io')

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

//end point
app.get('/',express.static('public'))