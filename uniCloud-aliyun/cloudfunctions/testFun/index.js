'use strict';

const { secret, getVersion } = require('hello-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	console.log('测试云函数')

	//返回数据给客户端
	const { name, pwd } = event
	console.log(getVersion)
	return {
		name, pwd,
		context,
		commonVersion: getVersion(),
		secret,
	}
};
