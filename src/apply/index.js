Function.prototype.myApply = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	}
	const args = arguments[1];
	context = context || window;
	context.fn = this;
	let result;
	if (args) {
		result = context.fn(...args);
	} else {
		result = context.fn();
	}
	delete context.fn;
	return result;
};