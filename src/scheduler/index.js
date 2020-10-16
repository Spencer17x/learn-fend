class Scheduler {
	constructor() {
		this.tasks = [], // 待运行的任务
			this.usingTasks = []; // 正在运行的任务
	}

	// promiseCreator 是一个异步函数，return Promise
	add(promiseCreator) {
		return new Promise((resolve, reject) => {
			promiseCreator.resolve = resolve;
			if (this.usingTasks.length < 2) {
				this.usingRun(promiseCreator);
			} else {
				this.tasks.push(promiseCreator);
			}
		});
	}

	usingRun(promiseCreator) {
		this.usingTasks.push(promiseCreator);
		promiseCreator().then(() => {
			promiseCreator.resolve();
			this.usingMove(promiseCreator);
			if (this.tasks.length > 0) {
				this.usingRun(this.tasks.shift());
			}
		});
	}

	usingMove(promiseCreator) {
		let index = this.usingTasks.findIndex(promiseCreator);
		this.usingTasks.splice(index, 1);
	}
}

const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
	scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// output: 2 3 1 4
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');