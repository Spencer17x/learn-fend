class Eventhub {
	constructor() {
		this.events = {};
	}

	on(eventName, callback) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	}

	emit(eventName, ...args) {
		this.events[eventName] = this.events[eventName] || [];
		// this.events[eventName].forEach(cb => {
		// 	cb.apply(null, args);
		// });
		this.events[eventName].filter(cb => cb !== null).forEach(cb => {
			cb.apply(null, args);
		});
	}

	off(eventName, callback) {
		this.events[eventName] = this.events[eventName] || [];
		const index = this.events[eventName].findIndex(cb => callback === cb);
		// 使用 splice 会影响数组的长度，导致输出会有问题
		// this.events[eventName].splice(index, 1);
		this.events[eventName][index] = null;
	}
}

const eventHub = new Eventhub();

function fn1() {
	console.log(1);
}

function fn2() {
	console.log(2);
}

function fn3() {
	console.log(3);
	eventHub.off('init', fn1);
	eventHub.off('init', fn2);
	eventHub.off('init', fn3);
}

function fn4() {
	console.log(4);
}

function fn5() {
	console.log(5);
}

function fn6() {
	console.log(6);
}

eventHub.on('init', fn1);
eventHub.on('init', fn2);
eventHub.on('init', fn3);
eventHub.on('init', fn4);
eventHub.on('init', fn5);
eventHub.on('init', fn6);

eventHub.emit('init');

eventHub.emit('init');

console.log('第一次执行事件');
eventHub.emit('init');
console.log('第二次执行事件');
eventHub.emit('init');