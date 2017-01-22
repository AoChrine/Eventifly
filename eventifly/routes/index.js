var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.post('/', function(req, res) {
	console.log("worked");
    res.send("hello");
});

module.exports = router;
