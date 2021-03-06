Function.prototype.myBind = function (context) {
	const _this = this;
	if (typeof _this !== 'function') {
		throw new TypeError('Error');
	}
	const args = [...arguments].slice(1);
	return function F() {
		if (this instanceof F) {
			return new _this(...args, ...arguments);
		}
		return _this.apply(context, args.concat(...arguments));
	};
};