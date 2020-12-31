var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { connect } =  require('./../connect/index')


/* post users listing. */
router.post('/', function(req, res, next) {
  const { username,password } = req.body
  connect(`select * from users where username='${username}' and password='${password}'`,function(err, rows){
    if (err) throw err
    if (rows.length > 0 ) {
      const user = {
        "jti": 1,
            "iss": "gumt.top",
            "user": "goolge",
            "name": username,
            'password': password
      }
      jwt.sign(user,"userKey",{ expiresIn: '1day' },(err,token) => {
        res.json({
          ...rows,
          status: 200,
          token: token
        })
      })
      // res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
    }else {
      res.json({
        status: 400
      })
    }
  })
});

router.post('/register', function(req, res, next) {
  const { username,password,role } = req.body
  connect(`select * from users where username='${username}'`,function(err, rows){
    if (rows.length > 0 ) {
      res.json({
        message: '注册失败',
        status: 404
      })
    
    }else{
      connect(`insert into users (username,password,role)values('${username}','${password}', ${role})`,function(err, rows){
        if (err) throw err
          res.json({
            message: '注册成功',
            status: 200
          })
      })
    }
  })
});
module.exports = router;
