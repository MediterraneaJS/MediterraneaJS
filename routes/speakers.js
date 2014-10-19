var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/apply', function (req, res) {
  if (!req.body['cfs-email']) {}
  if (!req.body['cfs-name']) {}
  if (!req.body['cfs-twitter']) {}
  if (!req.body['cfs-title']) {}
  if (!req.body['cfs-description']) {}
  if (!req.body['cfs-sponsor']) {}
  if (!req.body['cfs-attend']) {}
  res.send('thanks');
});

module.exports = router;
