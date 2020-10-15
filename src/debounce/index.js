/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {function(...[*]=): void}
 */
function debounce(fn, delay) {
	let timer = null;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}

const fn = debounce(n => console.log(n), 2000);

fn(1);