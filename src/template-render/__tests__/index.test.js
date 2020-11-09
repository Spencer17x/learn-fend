const render = require('..');

describe('实现template-render函数', function () {
	it('测试render函数', function () {
		const template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
		const data = {
			name: '姓名',
			age: 18
		};
		const html = render(template, data);
		expect(html).toBe('我是姓名，年龄18，性别undefined');
	});
});