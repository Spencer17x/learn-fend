const obj = {
	a: {
		b: {
			aa: {
				m0: '2'
			}
		},
		c: {
			bb: {
				m1: '2'
			}
		},
		d: {
			cc: {
				m2: '2'
			}
		}
	}
};

// [m0,m1,m2,aa,bb,cc,b,c,d,a]

const output = obj => {
	const queue = [];
	const result = [];

	function bfs(obj) {
		Object.keys(obj).reverse().forEach(key => {
			result.push(key);
			if (typeof obj[key] === 'object') {
				queue.push(obj[key]);
			}
		})

		while(queue.length) {
			bfs(queue.shift());
		}

		return result;
	}

	return bfs(obj).reverse();
}

console.log(output(obj));