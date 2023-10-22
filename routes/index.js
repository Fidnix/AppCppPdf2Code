var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'PDF de C++ a Codigo' });
});

module.exports = router;
