var path = require('path');
var express = require('express');
var session = require('express-session');


var routes = require('./routes');
var pkg = require('./package');

var app = express(); //启动express

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

app.use(session({
	name : config.session.key,   //设置cookie中保存session id的字段名称
	secret : config.session.secret,  //通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
	resave : true,  //强制更新session
	saveUninitialized : false,// 设置为 false，强制创建一个 session，即使用户未登录
	cookie : {
		maxAge : config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	}
}));	

// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
	console.log(`${pkg.name} listening on port ${config.port}`);
});