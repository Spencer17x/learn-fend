require('..');

describe('实现apply函数', () => {
	function show(...args) {
		return [this, args];
	}

	it('apply函数不带参数', function () {
		expect(show.myApply({ a: 1 })).toEqual(show.apply({ a: 1 }));
	});

	it('apply函数带参数', function () {
		expect(show.myApply({ a: 1 }, [2])).toEqual(show.apply({ a: 1 }, [2]));
	});
});