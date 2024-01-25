// HUVUDPROGRAMMET





var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// DEKLARERA UPPKOPPLING TILL DATABAS MED MONGOOSE
var mongoose = require('mongoose');
// LÄNK TILL DATABAS FÖR ATT CONNECTA
mongoose.connect("mongodb+srv://chanbatte:MongoAtlas123@cluster0.l1azorg.mongodb.net/productsapi");
console.log(mongoose.connect);
//TESTA CONNECTION
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
console.log("Kopplingen lyckades!");
});

var logger = require('morgan');

// 2 st ROUTES - INDEX OCH products
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);


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