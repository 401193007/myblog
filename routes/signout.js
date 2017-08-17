var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {

	//清空session中的用户信息
	req.session.user = null;
	//登出成功提示
	req.flash("success","登出成功");
	//登出成功后的跳页
	res.redirect("/posts");
	
});

module.exports = router;