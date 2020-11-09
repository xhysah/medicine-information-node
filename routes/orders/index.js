var express = require('express');
var router = express.Router();
const { connect, multiSql } =  require('./../../connect/index')
const time = require('./../../utils/addTime')

// 订单提交
router.post('/add', function(req, res, next) {
  const { totalNum, totalPrice} = req.body
  const createTime = time()
  const times = Date.now()
  const timeObj = new Date(times)
  const orderStatus = 0;
  const payWay =  0;
  const orderNum = '' + timeObj.getFullYear()+timeObj.getMonth()+timeObj.getDay()+times
    connect(`insert into orders(orderNum,orderStatus,payWay,totalNum,totalPrice,createTime) values('${orderNum}',${orderStatus},${payWay},${totalNum},${totalPrice},'${createTime}')`,function(err, rows){
        if (err) throw err
        // console.log(rows);
        res.json({
          orderNum,
          totalPrice,
          totalNum,
          insertId: rows.insertId
        })
    })
});

// 订单修改
router.post('/update', function(req, res, next) {
  const { orderNum, orderStatus, payWay, shoppingCartList} = req.body
  
  const payMentTime = time()
    connect(`update orders set orderStatus=${orderStatus},payWay=${payWay}, payMentTime='${payMentTime}' where orderNum='${orderNum}'`,function(err, rows){
        if (err) throw err
        if(orderStatus ===1){
          function fn(err, rows){
            if (err) throw err
          }
          const values = shoppingCartList.map(item=>{
            return ({sql:`update goods set stocks=stocks-${item.goodsNum},salesNum=salesNum+${item.goodsNum} where goodsId=${item.goodsId}`,
            fn
          })
          })

          multiSql(values)
        }
        res.json(rows)
    })
});
// 查询订单
router.get('/search', function(req, res, next) {
    connect(`select * from orders`, function(err, rows){
        if (err) throw err
        // console.log(rows);
        res.json(rows)
    })
});

// 查询支付方式
router.get('/payWay', function(req, res, next) {
  const {start, end} = req.query
  const message={}
  if(start === ''){
    connect(`select * from orders where payWay=1`, function(err, rows){
      const totalPrice = rows.reduce((pre,cur) => {
        return pre+cur.totalPrice
      },0);
      message['1'] = {
        num:rows.length,
        totalPrice
      }
      connect(`select * from orders where payWay=2`, function(err, rows){
        const totalPrice = rows.reduce((pre,cur) => {
          return pre+cur.totalPrice
        },0);
        message['2'] = {
          num:rows.length,
          totalPrice
        }
        connect(`select * from orders where payWay=3`, function(err, rows){
          const totalPrice = rows.reduce((pre,cur) => {
            return pre+cur.totalPrice
          },0);
          message['3'] = {
            num:rows.length,
            totalPrice
          }
          res.json(message)
          // console.log(message);
        })
      })
    })
  }else{
    connect(`select * from orders where payWay=1 and date(payMentTime) between '${start}' and '${end}'`, function(err, rows){
      const totalPrice = rows.reduce((pre,cur) => {
        return pre+cur.totalPrice
      },0);
      message['1'] = {
        num:rows.length,
        totalPrice
      }
      console.log(rows);
      connect(`select * from orders where payWay=2 and date(payMentTime) between '${start}' and '${end}'`, function(err, rows){
        const totalPrice = rows.reduce((pre,cur) => {
          return pre+cur.totalPrice
        },0);
        message['2'] = {
          num:rows.length,
          totalPrice
        }
        connect(`select * from orders where payWay=3 and date(payMentTime) between '${start}' and '${end}'`, function(err, rows){
          const totalPrice = rows.reduce((pre,cur) => {
            return pre+cur.totalPrice
          },0);
          message['3'] = {
            num:rows.length,
            totalPrice
          }
          res.json(message)
          // console.log(message);
        })
      })
    })
  }
});

// 根据时间查询订单
router.get('/payMentTime', function(req, res, next) {
  const result=[]
  connect(`select SUM(totalPrice) as totalPrice,DATE_FORMAT(payMentTime,'%Y-%m-%d') as time from orders where orderStatus =1 group by time`,function(err,row){
    
      if (err) throw err
      result.push(row)
      connect(`select SUM(totalPrice) as totalPrice,DATE_FORMAT(payMentTime,'%Y-%m-%d') as time from orders where orderStatus =1 and payWay =1 group by time`,function(err,row1){

        result.push(row1)
        connect(`select SUM(totalPrice) as totalPrice,DATE_FORMAT(payMentTime,'%Y-%m-%d') as time from orders where orderStatus =1 and payWay =2 group by time`,function(err,row2){
          result.push(row2)
          connect(`select SUM(totalPrice) as totalPrice,DATE_FORMAT(payMentTime,'%Y-%m-%d') as time from orders where orderStatus =1 and payWay =3 group by time`,function(err,row3){
            result.push(row3)
            res.json(result)
          })
        })
        
      })
  })
});

// 删除订单
router.get('/deleteOrders', function(req, res, next) {
  const { orderNum } = req.query
  connect(`delete from orders where orderNum = '${orderNum}'`, function(err, rows){
      if (err) throw err
    connect(`delete from orderDetails where orderNum= '${orderNum}'`, function(err, rows){
        if (err) throw err
        console.log(rows);
        res.json(rows)
    })
  })
});

// 查询订单
router.get('/searchOrdersByTime', function(req, res, next) {
  const {payWay, start, end} = req.query
  if(start===''){
    if(payWay==0){
      sql=`select * from orders`
    }else{
      sql=`select * from orders where payWay=${payWay}`
    }
  }else{
    if(payWay==0){
      sql=`select * from orders where date(payMentTime) between '${start}' and '${end}'`
    }else{
      sql=`select * from orders where date(payMentTime) between '${start}' and '${end}' and payWay=${payWay}`
    }
  }
  connect(sql, function(err, rows){
    if (err) throw err
    // console.log(rows);
    res.json(rows)
})
});
module.exports = router;