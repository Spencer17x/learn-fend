/**
 * 实现一个bindData函数，当obj属性值发现变化执行func函数
 * @param obj
 * @param func
 */
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

module.exports = bindData;