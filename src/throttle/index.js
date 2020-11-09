/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=): void}
 */
function throttle(fn, delay) {
	let lastTime = 0;
	return function (...args) {
		let now = +new Date()
		if (now - lastTime > delay) {
			lastTime = now;
			fn.apply(this, args);
		}
	};
}

module.exports = throttle;