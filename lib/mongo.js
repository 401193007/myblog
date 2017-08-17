var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

var moment = require('moment');   //时间格式化
var objectIdToTimestamp = require('objectid-to-timestamp');  //根据 ObjectId 生成时间戳

mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
	name: { type: 'string' },
	password: { type: 'string' },
	avatar: { type: 'string' },
	gender: { type: 'string', enum: ['m', 'f', 'x'] },
	bio: { type: 'string' }
});

// 根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec();

// 定义了用户表的 schema，生成并导出了 User 这个 model，
// 同时设置了 name 的唯一索引，保证用户名是不重复的。


// 根据 id 生成创建时间 created_at
mongolass.plugin("addCreateAt",{
	afterFind : function(results){
		results.forEach(function(item){
			item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
		});
		return results;
	},
	afterFindOne : function(result){
		if(result){
			result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
		}
		return result;
	}
});