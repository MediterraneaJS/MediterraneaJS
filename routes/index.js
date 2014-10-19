var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/call-for-speakers', function (req, res) {
  res.render('call-for-speakers');
});

router.get('/code-of-conduct', function (req, res) {
  res.render('code-of-conduct');
});

module.exports = router;
