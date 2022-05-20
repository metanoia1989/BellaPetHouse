// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

module.exports = {
	/**
	 * 在调用常规方法之前进行预处理，一般用于拦截器、统一的身份验证、参数校验等
	 */
	_before: function() {
		this.not_auth = [
			'apiInfo', 'add'
		]
		this.startTime = Date.now() // 在before内记录开始时间并在this上挂载，以供后续流程使用

		const methodName = this.getMethodName()	
		if (!this.not_auth.includes(methodName) && !this.getUniIdToken()) {
			throw new Error('没有token')
		}
	},
	/**
	 * 用来再加工处理本次调用方法的返回结果或者抛出的错误
	 */
	_after: function(error, result) {
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		result.timeCost = Date.now() - this.startTime
		return result
	},
	add: function(title = '', content = '') {
		title = title.trim()
		content = content.trim()
		if(!title || !content) {
			return {
				errCode: '无效的参数',
				errMsg: '标题和内容不能为空'
			}
		}
		// TODO 
		return {
			errCode: 0,
			errMsg: '创建成功'
		}
	},
	/**
	 * 云对象API使用
	 */
	apiInfo: function() {
		// 获取客户端信息
		const clientInfo = this.getClientInfo()
		// clientInfo = {
		// 	os,
		// 	appId,
		// 	locale,
		// 	clientIP,
		// 	userAgent,
		// 	platform,
		// 	deviceId,
		// 	uniIdToken
		// }

		// 获取客户端token
		const token = this.getUniIdToken()

		// 获取当前调用的方法名
		const methodName = this.getMethodName()

		// 获取当前参数列表
		const params = this.getParams()

		return {
			errCode: 0,
			errMsg: 'Success1',
			data: {
				clientInfo,
				token,
				methodName,
				params,
			}
		}
	}
}
