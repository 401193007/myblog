var express = require('express');
var router = express.Router();

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function(req, res, next) {
	res.send(req.flash());
});

// POST /posts 发表一篇文章
router.post('/', checkLogin, function(req, res, next) {
	res.send(req.flash());
});

module.exports = router;