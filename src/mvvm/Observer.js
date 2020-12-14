/**
 * 观察者
 * @class Watcher
 */
class Watcher {
  constructor(vm, directiveVal, cb) {
    this.vm = vm;
    this.oldVal = this.getOldVal(vm, directiveVal);
    this.cb = cb;
  }

  /**
   * 获取旧值
   * @param {*} vm 
   * @param {*} directiveVal 
   */
  getOldVal(vm, directiveVal) {
    Dep.target = this; // 获取值之前实例化该属性的观察者
    const oldValue = CompilerUtils.getVal(vm, directiveVal);
    Dep.target = null; // 创建完该属性的观察者之后，清除target，防止其他属性使用同一个观察者
    return oldValue;
  }

  /**
   * 当data中数据发生变化，dep触发notify通知观察者，更新视图
   * @param {*} newVal 
   */
  update(newVal) {
    if (this.oldVal !== newVal) {
      this.cb(newVal);
    }
  }
}

/**
 * 订阅器
 * @class Dep
 */
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify(newVal) {
    this.subs.forEach(sub => {
      sub.update(newVal);
    })
  }
}

/**
 * 数据劫持
 * @class Observer
 */
class Observer {
  constructor(data, vm) {
    this.observer(data);
    this.proxyData(data, vm);
  }

  /**
   * 当访问this.a及this.$data.a
   * @param {*} data 
   * @param {*} vm 
   */
  proxyData(data, vm) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        let val = data[key];
        Object.defineProperty(vm, key, {
          get: () => {
            return val;
          },
          set: newVal => {
            if (val !== newVal)  {
              data[key] = newVal;
            }
          }
        })
      })
    }
  }

  /**
   * 数据响应
   * @param {*} data 
   */
  observer(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      }); 
    }
  }

  /**
   * 对数据各个属性实现劫持
   * @param {*} data 
   * @param {*} key 
   * @param {*} val 
   */
  defineReactive(data, key, val) {
    this.observer(val);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      get: () => {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set: newVal => {
        if (val !== newVal)  {
          val = newVal;
        }
        dep.notify(newVal);
      }
    })
  }
}