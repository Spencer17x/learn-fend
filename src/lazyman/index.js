/**
 * 实现LazyMan, 能按以下方式调用
 * LazyMan("Hank") -> 你好, 我是 Hank
 * LazyMan("Hank").sleep(10).eat("lunch") -> 你好, 我是 Hank, (沉默十秒), 我醒了, 我刚睡了10秒, 吃午餐
 * LazyMan("Hank").eat("lunch").eat("supper") -> 你好, 我是 Hank, 吃午餐, 吃晚餐
 * LazyMan("Hank").sleepFirst(5).eat("supper") -> (沉默5秒), 我醒了, 我刚睡了5秒, 你好, 我是 Hank, 吃晚餐
 */
const LazyMan = name => {
	const queueTask = [];
	const sayHi = () => {
		console.log(`你好, 我是${name}`);
		next();
	}
	const next = () => {
		const firstTask = queueTask.shift();
		firstTask?.();
	}
	queueTask.push(sayHi);
	setTimeout(next);
	return {
		sleep(duration) {
			const fn = () => {
				setTimeout(() => {
					console.log(`我醒了, 我刚睡了${duration}秒`);
					next();
				}, duration * 1000)
			}
			queueTask.push(fn);
			return this;
		},
		eat(food) {
			const fn = () => {
				console.log(`吃${food}`);
				next();
			}
			queueTask.push(fn);
			return this;
		},
		sleepFirst(duration) {
			const fn = () => {
				setTimeout(() => {
					console.log(`我醒了, 我刚睡了${duration}秒`);
					next();
				}, duration * 1000)
			}
			queueTask.unshift(fn);
			return this;
		}
	}
}

// LazyMan("Hank")
LazyMan("Hank").sleep(3).eat("lunch")
// LazyMan("Hank").eat("lunch").eat("supper")
// LazyMan("Hank").sleepFirst(5).eat("supper")