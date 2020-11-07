const { cloneDeep } = require('..');

describe('实现深拷贝函数', function () {
	const origin = {
		a: 'a',
		b: {
			c: {
				d: 'd'
			}
		}
	};
	it('cloneDeep', () => {
		const res = cloneDeep(origin);
		res.b.c.d = 'dd';
		expect(res).toEqual({
			a: 'a',
			b: {
				c: {
					d: 'dd'
				}
			}
		});
	});
});