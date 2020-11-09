var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
const { connect } =  require('./../../connect/index')
const time = require('./../../utils/addTime')

// 增加商品数据
router.post('/add', function(req, res, next) {
  const { cid, goodsName, price, goodsUrl, stocks, description} = req.body
  console.log(price);
  const addTime = time()
  const updateTime = addTime
    connect(`insert into goods(cid,goodsName,price,goodsUrl,stocks,addTime,description,updateTime,salesNum) values(${cid},'${goodsName}',${price},'${goodsUrl}',${stocks},'${addTime}','${description}','${updateTime}',0)`,function(err, rows){
        if (err) throw err
        console.log(rows);
        res.json(rows)
    })
});

// 查询商品数据
router.get('/search', function(req, res, next) {
  const { cid } = req.query
    connect(`select * from goods where cid='${cid}'`,function(err, rows){
        if (err) throw err
        res.json(rows)
    })
});

// 更新商品数据
router.post('/update', function(req, res, next) {
  const { goodsId ,cid, goodsName, price, goodsUrl, stocks, description} = req.body
  const updateTime = time()
    connect(`update goods set cid=${cid}, goodsName='${goodsName}', price=${price}, goodsUrl='${goodsUrl}', stocks=${stocks}, description='${description}', updateTime='${updateTime}' where goodsId=${goodsId}`,function(err, rows){
        if (err) throw err
        res.json(rows)
    })
});

// 删除商品数据
router.post('/delete', function(req, res, next) {
  const { goodsId, goodsUrl } = req.body

    connect(`delete from goods where goodsId=${goodsId}`,function(err, rows){
        if (err) throw err
        var arrUrl = goodsUrl.split('//')[1]
        const pathUrl = arrUrl.substring(arrUrl.indexOf('/'))
        const pathName = path.resolve(__dirname, `./../../public/${pathUrl}`)
        fs.unlink(pathName, (err) => {
          if (err) throw err;
          res.json(rows)
        })
    })
});
module.exports = router;