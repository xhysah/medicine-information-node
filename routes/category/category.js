var express = require('express');
var fs = require('fs')
var path = require('path')
var router = express.Router();
const { connect } =  require('./../../connect/index')
const time =  require('./../../utils/addTime')


router.get('/search', function(req, res, next) {
    connect('select * from categories',function(err, rows){
        if (err) throw err
        res.json(rows)
    })
});

router.post('/add', function(req, res, next) {;
    const { cname, description,imgUrl } = req.body
    const addTime = time()
    connect(`insert into categories(cname,description,addTime,imgUrl) values('${cname}','${description}','${addTime}','${imgUrl}')`,function(err, rows, fields){
        if (err) throw err
        const pathName = path.resolve(__dirname, `./../../public/images/goods/c${rows.insertId}`)
        fs.mkdir(pathName, { recursive: true }, (err) => {
            if (err) throw err;
        });
        res.json(rows) 
    })
});

router.post('/edit', function(req, res, next) {;
    const { cname, description,imgUrl,cid } = req.body
    console.log(cname, description,imgUrl,cid);
    connect(`update categories set cname='${cname}',description='${description}',imgUrl='${imgUrl}' where cid=${cid}`,function(err, rows, fields){
        if (err) throw err
        res.json(rows) 
    })
});

module.exports = router;