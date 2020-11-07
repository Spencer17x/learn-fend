Function.prototype.myCall = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	}
	const args = [...arguments].slice(1);
	context = context || window;
	context.fn = this;
	const result = context.fn(...args);
	delete context.fn;
	return result;
};