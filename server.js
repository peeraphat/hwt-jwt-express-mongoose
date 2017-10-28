const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Task = require('./api/models/todoListModel')
const User = require('./api/models/userModel')
const jsonwebtoken = require('jsonwebtoken')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Tododb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  })

var routes = require('./api/routers/todoListRoutes')
routes(app)


app.listen(port, () => console.log('run on 3000'))