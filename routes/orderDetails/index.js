var express = require('express');
var router = express.Router();
const { connect } =  require('./../../connect/index')

// 增加订单详情数据
router.post('/add', function(req, res, next) {
  const { orderNum, shoppingCartList} = req.body
  const values = shoppingCartList.map(item =>{
    return `('${orderNum}',${item.goodsId},'${item.goodsName}',${item.goodsNum},${item.price},'${item.goodsUrl}')`
  })
  connect(`insert into orderDetails (orderNum,goodsId,goodsName,goodsNum,price,imgUrl) values ${values}`,function(err, rows){
      if (err) throw err
      res.json(rows)
  })
});


// 根据订单编号查询信息
router.get('/search', function(req, res, next) {
  const { orderNum } = req.query
    connect(`select * from orderDetails where orderNum='${orderNum}'`,function(err, rows){
        if (err) throw err
        res.json(rows)
    })
});

module.exports = router;