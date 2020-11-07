const create = require('..');

describe('实现new函数', () => {
	function Show(a) {
		this.a = a;
	}

	function showObject() {
		return { name: 'object' };
	}

	it('new函数带参数', () => {
		expect(create(Show, 1)).toEqual(new Show(1));
	});

	it('new函数不带参数', () => {
		expect(create(Show)).toEqual(new Show());
		expect(create(showObject)).toEqual(new showObject());
	});
});