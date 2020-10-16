function cloneDeep(source) {
	if (typeof source === 'object' && source !== null) {
		const result = Array.isArray(source) ? [] : {};
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				result[key] = cloneDeep(source[key]);
			}
		}
		return result;
	}
	return source;
}

const source = { a: 1, b: { c: { d: 2 } }, e: 3 };
const cloned = cloneDeep(source);
source.b.c.d = 4;

console.log('source', source);
console.log('clonedArray', cloned);