// JSON.parse(JSON.stringify(object)) 存在的问题:
// 1.会忽略 undefined
// 2.会忽略 symbol
// 3.不能序列化函数
// 4.不能解决循环引用的对象
// 5.数据失真、丢失，Date对象拷贝后数据类型变成字符串，正则对象、Error对象拷贝后变成空对象，
// NaN、Infinity、-Infinity 拷贝后变为null
// 如果对象的某个属性是由构造函数生成的，那么在拷贝后，他的constructor会指向Object。
// 参考：
// https://segmentfault.com/a/1190000023595021
// https://juejin.im/book/6844733763675488269/section/6844733763759374350(深拷贝)

/**
 * MessageChannel 实现深拷贝
 * 如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
 * 注意该方法是异步的
 * 可以处理 undefined 和循环引用对象
 * @param obj
 * @returns {Promise<unknown>}
 */
function structuralClone(obj) {
	return new Promise(resolve => {
		const { port1, port2 } = new MessageChannel();
		port2.onmessage = ev => resolve(ev.data);
		port1.postMessage(obj);
	});
}

/**
 * 简易的深拷贝
 * @param source
 * @returns {*[]|*}
 */
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

module.exports = {
	structuralClone,
	cloneDeep
}