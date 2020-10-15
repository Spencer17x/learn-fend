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

function show(a, b) {
	console.log(this, a, b);
}

show.myCall({ a: 1 }, 2, 3);
show.myCall({ a: 1 });