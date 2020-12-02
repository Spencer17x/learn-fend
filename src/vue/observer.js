function callback(value) {
	console.log(`视图更新了${value}`);
}

function observer(data) {
	Object.keys(data).forEach((key) => {
		const dep = new Dep();
		let value = data[key];
		Object.defineProperty(data, key, {
			get() {
				dep.addSub(Dep.target);
				return value;
			},
			set(newVal) {
				value = newVal;
				dep.notify();
				return value;
			}
		});
	});
}

class Dep {
	constructor() {
		// 用来存放Watcher对象的数组
		this.subs = [];
	}

	// 在subs中添加一个Watcher对象
	addSub(sub) {
		this.subs.push(sub);
	}

	// 通知所有Watcher对象更新视图
	notify() {
		this.subs.forEach(sub => {
			sub.update();
		});
	}
}

class Watcher {
	constructor() {
		// 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
		Dep.target = this;
	}

	update() {
		console.log('视图更新啦~');
	}
}

Dep.target = null;

class Vue {
	constructor(options) {
		this.data = options.data;
		observer(this.data);
		/* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
		new Watcher();
		console.log('render~', this.data.name);
	}
}

const vue = new Vue({
	data: {
		name: 'xxx',
		age: 17
	}
});

vue.data.name = 'ccc';
vue.data.age = 18;
