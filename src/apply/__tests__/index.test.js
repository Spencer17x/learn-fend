require('..');

describe('测试apply函数', () => {
	function show(...args) {
		return [this, args];
	}

	it('myApply不带参数', function () {
		expect(show.myApply({ a: 1 })).toEqual(show.apply({ a: 1 }));
	});

	it('myApply带参数', function () {
		expect(show.myApply({ a: 1 }, [2])).toEqual(show.apply({ a: 1 }, [2]));
	});
});