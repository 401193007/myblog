var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var formidable = require('express-formidable');


var config = require("./config/default.js")
var routes = require('./routes/index.js');
var pkg = require('./package.json');

var app = express(); //启动express

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	name : config.session.key,   //设置cookie中保存session id的字段名称
	secret : config.session.secret,  //通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
	resave : true,  //强制更新session
	saveUninitialized : false,// 设置为 false，强制创建一个 session，即使用户未登录
	cookie : {
		maxAge : config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({// 将 session 存储到 mongodb
		url: config.mongodb// mongodb 地址
	})	
}));	

// flash 中间件，用来显示通知
app.use(flash());

// 处理表单和上传的中间件
app.use(formidable({
	uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
	keepExtensions: true// 保留后缀
}));

// 设置模板全局常量
app.locals.blog = {
	title: pkg.name,
	description: pkg.description
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next();
});

// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
	console.log(`${pkg.name} listening on port ${config.port}`);
});