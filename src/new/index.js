function create(...args) {
	const obj = {};
	const Con = [].shift.call(args);
	obj.__proto__ = Con.prototype;
	const result = Con.apply(obj, args);
	return result instanceof Object ? result : obj;
}

module.exports = create;