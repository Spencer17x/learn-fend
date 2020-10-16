const obj = {
	key_1: 1,
	key_2: 2
};

function func(key) {
	console.log(key + ' 的值发生改变：' + this[key]);
}

const bindData = (obj, func) => {
	Object.keys(obj).forEach(key => {
		let val = obj[key];
		Object.defineProperty(obj, key, {
			get() {
				return val;
			},
			set(newVal) {
				val = newVal;
				func.bind(obj)(key);
			}
		});
	});
};

bindData(obj, func);
obj.key_1 = 2; // 此时自动输出 "key_1 的值发生改变：2"
obj.key_2 = 1; // 此时自动输出 "key_2 的值发生改变：1"