const bindData = require('..');

describe('实现bindData函数', function () {
	const obj = {
		key_1: 1,
		key_2: 2
	};
	const result = []
	function func(key) {
		result.push(key + ' 的值发生改变：' + this[key])
	}
	it('测试bindData函数', function () {
		bindData(obj, func);
		obj.key_1 = 2; // 此时自动输出 "key_1 的值发生改变：2"
		obj.key_2 = 1; // 此时自动输出 "key_2 的值发生改变：1"
		expect(result).toEqual([
			"key_1 的值发生改变：2",
			"key_2 的值发生改变：1"
		])
	});
});