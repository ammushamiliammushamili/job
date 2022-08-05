var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload')
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require("./config/config")
connectDB()
var indexRouter = require('./routes/index');
var companyRouter = require('./routes/company');
const { connect } = require('http2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1 * 60 * 60 * 1000 }//cookkie ethra neram nkkunna time with milli second//
}))
app.use('/', indexRouter);
app.use('/company', companyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
