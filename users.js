var User = require('../lib/mongo').User;   //这相当于一个表

module.exports = {
	// 注册一个用户
	create: function create(user) {
		return User.create(user).exec();
	}
};