var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./app_server/routes/index');
var app = express();
var session = require('express-session');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'app_server', 'views'));


require('./models/db')

app.use(express.static(__dirname + '/public')); 

app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); ;
app.use(session({
    secret: 'cpe_281_secure_string',
    resave: false,
    saveUninitialized: true
  }));
app.use('/',index);
module.exports = app;
console.log("port:3000");
app.listen(3000);