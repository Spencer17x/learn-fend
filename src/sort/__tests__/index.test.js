const { bubble_sort } = require('..');

describe('排序算法', () => {
	const generateRandomArray = (len = 10) => {
		const result = [];
		for (let i = 0; i < len; i++) {
			// num < 100 && num >= 0
			const num = parseInt(Math.random() * 100 + '');
			result.push(num);
		}
		return result;
	};
	const randomArray = generateRandomArray();
	it('冒泡排序', function () {
		expect(bubble_sort(randomArray.slice())).toEqual(randomArray.slice().sort((a, b) => a - b));
	});
});