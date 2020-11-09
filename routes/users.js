var express = require('express');
var router = express.Router();
const { connect } =  require('./../connect/index')


/* post users listing. */
router.post('/', function(req, res, next) {
  const { username,password } = req.body
  console.log(username,password)
  connect(`select * from users where username='${username}' and password='${password}'`,function(err, rows){
    if (err) throw err
    if (rows.length > 0 ) {
      res.cookie('isVisit', 1, {maxAge: 600 * 1000})
      res.json({
        ...rows,
        status: 200
      })
      // res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
    }else {
      res.json({
        status: 400
      })
    }
  })
});

module.exports = router;
