var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/category/category');
var goodsRouter = require('./routes/goods/goods');
var upload = require('./routes/upload/index')
var orders = require('./routes/orders/index')
var orderDetails = require('./routes/orderDetails/index');

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','POST,GET,OPTIONS,DELETE');
    res.header("Access-Control-Allow-Headers", "origin,accept,x-requested-with,Content-Type,Authorization");
    next()
});


router.all('*', function(req, res, next){
    const token = req.header('Authorization')
    if(token == null){
        if(req.originalUrl == '/users'){
            next()
        }else{
            res.end('请重新登陆')
        }
    }else{
        console.log('hgggg');
        jwt.verify(token,'userKey',(error,decode)=>{
            if(error) throw error
            next()
        })
    }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/goods', goodsRouter);
app.use('/upload', upload);
app.use('/orders', orders);
app.use('/orderDetails', orderDetails);

module.exports = app;

