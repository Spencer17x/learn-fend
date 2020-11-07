require('..');

describe('实现bind函数', () => {
	function show(...args) {
		return [this, args];
	}

	it('bind函数不带参数', function () {
		expect(show.myBind({ a: 1 })()).toEqual(show.bind({ a: 1 })());
	});

	it('bind函数不带参数', function () {
		expect(show.myBind({ a: 1 }, 2)(3)).toEqual(show.bind({ a: 1 }, 2)(3));
		expect(show.myBind({ a: 1 }, 2)(3)).toEqual(show.bind({ a: 1 }, 2)(3));
	});
});