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

function show(o) {
	this.o = o;
}

const o1 = show.myBind({ a: 1 })({ b: 1 });
const r1 = show.myBind({ a: 1 });
const s1 = new r1({ b: 1 });

const o2 = show.bind({ a: 1 })({ b: 1 });
const r2 = show.bind({ a: 1 });
const s2 = new r2({ b: 1 });

console.log(o1, o2);
console.log(s1, s2);