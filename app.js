var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/category/category');
var goodsRouter = require('./routes/goods/goods');
var upload = require('./routes/upload/index')
var orders = require('./routes/orders/index')
var orderDetails = require('./routes/orderDetails/index')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "origin,accept,x-requested-with,Content-Type");
    next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/goods', goodsRouter);
app.use('/upload', upload);
app.use('/orders', orders);
app.use('/orderDetails', orderDetails);

module.exports = app;

