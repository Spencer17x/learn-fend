function swap(array, left, right) {
	let rightValue = array[right];
	array[right] = array[left];
	array[left] = rightValue;
}

/**
 * 冒泡排序
 * @param array
 * @returns {*[]}
 */
exports.bubble_sort = function bubble_sort(array = []) {
	for (let i = array.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (array[j] > array[j + 1]) swap(array, j, j + 1);
		}
	}
	return array;
}

