//import npm packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');


//load in any env variables from our .env file
require('dotenv').config()

//connect to our local mongoDB
console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
mongoose.connect(process.env.MONGO_DB);

//import our routers
var indexRouter = require('./routes/index');  //index = index.js
var apiRouter = require('./routes/api');      //api = api folder

//create an instance of our express app
var app = express();


// view engine setup..for serving html pages..we wont be using this
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); //allow access from anywhere 
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));  //for any static content use public folder
app.use(express.json()); //parses the body from the requests and adds to the req body



//we define a router based off these 2 files
//if request comes in and its in '/' send requrest to indexrouter
//DIRECT THE INCOMING REQUEST TO A PARTICULAR ROUTER BASED ON THE URL PATH
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
