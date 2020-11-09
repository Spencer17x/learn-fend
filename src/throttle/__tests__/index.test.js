const throttle = require('..');

describe('实现节流throttle', function () {
	it('测试throttle函数', function (done) {
		const mockFn = jest.fn();
		const fn = throttle(mockFn, 10);
		fn(1);
		fn(2);
		setTimeout(() => {
			const calls = mockFn.mock.calls;
			expect(calls.length).toBe(1);
			expect(calls[0][0]).toBe(1);
			done();
		}, 50);
	});
});