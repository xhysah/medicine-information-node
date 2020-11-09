var express = require('express');
const multer = require('multer');
var router = express.Router();

let upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(req.body.url);
          cb(null, `./public/images/${req.body.url}/`);
      },
      filename: function (req, file, cb) {
          var changedName = (new Date().getTime())+'-'+file.originalname;
          cb(null, changedName);
      }
  })
});

router.post('/', upload.single('file'), (req, res) => {
  // console.log(req);
  res.json({
      code: '0000',
      type: 'single',
      originalname: req.file.originalname,
      path: req.file.path
  })
});

module.exports = router;