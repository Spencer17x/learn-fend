function show(o) {
	this.a = 1;
	this.b = o;
}

function create(...args) {
	const obj = {};
	const Con = [].shift.call(args);
	obj.__proto__ = Con.prototype;
	const result = Con.apply(obj, args);
	return result instanceof Object ? result : obj;
}

const obj = create(show, 2);

console.log(obj);