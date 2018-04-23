var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//---------------- 自定义路由-----------------


var login = require('./routes/login');
var registerrequest = require('./routes/registerrequest');


//------------------连接数据库------------
//引入mongoose
var mongoose = require('mongoose');
//引入express-session
var session = require('express-session');

mongoose.connect("mongodb://localhost:27017/ctdata");

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//在进入页面之前先用session 配置session--------------------------------------------------------
//------------------------------------------------------------------------------
app.use(session({
  name:'ctNodeSessionId',
  secret:"qwertyuiop",
  cookie:{maxAge: 1000*3600*24*7}, // 存一周：
  resave:true,                     //每次登录有重新开始计时
  saveUninitialized :true          //一开始就生成session

}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login',login);
app.use("/registerrequest",registerrequest)

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
