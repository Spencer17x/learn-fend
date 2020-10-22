const create = require('..');

describe('实现new函数', () => {
	function Show(a) {
		this.a = a;
	}

	it('create函数带参数', () => {
		expect(create(Show, 1)).toEqual(new Show(1));
	});

	it('create函数不带参数', () => {
		expect(create(Show)).toEqual(new Show());
	});
});