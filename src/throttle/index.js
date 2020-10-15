/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=): void}
 */
function throttle(fn, delay) {
	let lastTime = Date.now();
	return function (...args) {
		if (Date.now() - lastTime >= delay) {
			lastTime = Date.now();
			fn.apply(this, args);
		}
	};
}

const fn = throttle(num => console.log(num), 2000);

setInterval(() => {
	fn(1);
}, 500);