/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=): void}
 */
function throttle(fn, delay) {
	let lastTime = 0;
	return function (...args) {
		if (Date.now() - lastTime >= delay) {
			lastTime = Date.now();
			fn.apply(this, args);
		}
	};
}

module.exports = throttle;