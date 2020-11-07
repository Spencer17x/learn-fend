require('..');

describe('实现call函数', () => {
	function show(...args) {
		return [this, args];
	}

	it('call函数不带参数', function () {
		expect(show.call({ a: 1 })).toEqual(show.call({ a: 1 }));
	});

	it('call函数不带参数', function () {
		expect(show.call({ a: 1 }, 2)).toEqual(show.call({ a: 1 }, 2));
	});
});