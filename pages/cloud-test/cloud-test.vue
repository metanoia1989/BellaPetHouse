<template>
	<view class="cloud-test-page">
		<view class="page-title">
			云函数测试
		</view>
		<button @tap="testFun">testFun</button>
		
		<view class="page-title">
			对象测试
		</view>
		<button @tap="testObjAdd">testObj.add</button>
		<button @tap="testObjAdd(true)">testObj.add 错误参数</button>
		<button @tap="testObjApiInfo">testObj.apiInfo</button>
	</view>
</template>

<script>
	
	const testObj = uniCloud.importObject('testObj')
					
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			async testObjAdd(empty = false) {
				if (empty) {
					const res = await testObj.add()
					console.log('响应', res)
				} else {
					const res = await testObj.add('hello', 'hello testObj')
					console.log('响应', res)
				}
			},
			async testObjApiInfo() {
				const res = await testObj.apiInfo('hello', 'hello testObj')
				console.log('响应', res)
			},
			/**
			 * 测试云函数
			 */
			async testFun() {
				const res = await uniCloud.callFunction({
					name: 'testFun',
					data: {
						name: '咕咕咕咕咕',
						pwd: '123456',
					}
				})
				console.log('响应', res)
			},
		}
	}
</script>

<style lang="scss">
	.page-title {
		font-size: 40rpx;
		text-align: center;
		font-weight: bold;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
</style>
