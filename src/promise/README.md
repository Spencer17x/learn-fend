# Promises/A+

翻译：https://promisesaplus.com/

**这是一个开放的标准，实现者为实现者提供了良好的、可互操作的JavaScript promises。**

promise表示异步操作的最终结果。与promise交互的主要方式是通过其then方法，该方法注册回调以接收promise的最终值或promise无法实现的原因。

该规范详细描述了then方法的行为，提供了一个可互操作的基础，所有Promises/A+一致的promise实现都可以依赖于它来提供。因此，规范应该被认为是非常稳定的。尽管Promises/A+组织偶尔会对本规范进行一些小的向后兼容更改，以解决新发现的角落情况，但只有经过仔细考虑、讨论和测试后，我们才会集成较大或向后不兼容的更改。

从历史上看，Promises/A+澄清了早期 [Promises/A proposal](http://wiki.commonjs.org/wiki/Promises/A) 的行为条款，将其扩展到涵盖事实上的行为，并省略了未指定或有问题的部分。

最后，核心Promises/A+规范不涉及如何创建、实现或拒绝承诺，而是选择集中于提供可互操作的then方法。未来在配套规范中的工作可能会涉及到这些主题。

## 1. 术语

1.1. “promise”是一个具有then方法的对象或函数，其行为符合此规范。
1.2. “thenable”是一个定义then方法的对象或函数。
1.3. “value”是任何合法的JavaScript值（包括undefined、thenable或promise）。
1.4. “exception”是使用throw语句引发的值。
1.5. “reason”是一个值，它指示承诺被拒绝的原因。

## 2. 必备条件

### 2.1 Promise 状态

promise必须处于三种状态之一：pending、fulfilled或者rejected。

2.1.1. 当pending，promise： 
* 2.1.1.1. 可能过渡到fulfilled或rejected状态。

2.1.2. 当fulfilled，promise：
* 2.1.2.1. 不得转换到任何其他状态
* 2.1.2.2. 必须有一个值，该值不能更改。

2.1.3. 当rejected，promise：
* 2.1.3.1. 不得转换到任何其他状态。
* 2.1.3.2. 一定要有原因，不能改变。

这里，“不得改变”意味着不变的身份（即===），但并不意味着深度不变性。

### 2.2 then 方法

promise必须提供一个then方法来访问其当前或最终的值或原因。

promise then 方法接受2个参数：

```js
promise.then(onFulfilled, onRejected)
```

2.2.1. onFulfilled和onRejected都是可选参数：
* 2.2.1.1. 如果onFulfilled不是函数，则必须忽略它。
* 2.2.1.2. 如果onRejected不是函数，则必须忽略它。

2.2.2. 如果onFulfilled是一个函数：
* 2.2.2.1. 它必须在promise fulfilled之后调用，并且promise的值作为其第一个参数
* 2.2.2.2. 它一定不能在promise fulfilled之前被调用
* 不能多次调用它

2.2.3. 如果onRejected是一个函数：
* 2.2.3.1. 它必须在promise被rejected后调用，并以promise的reason作为第一个参数。
* 2.2.3.2. 在promise被rejected之前，它不能被调用。
* 2.2.3.3. 不能多次调用它。

2.2.4. 在[执行上下文](https://es5.github.io/#x10.3)堆栈仅包含平台代码之前，不得调用onFulfilled或onRejected。[[3.1](###3.1)]

2.2.5. onFulfilled和onRejected必须作为函数调用（即没有这个值）。[[3.2](###3.2)]

2.2.6. then在同一个promise下可能会被多次调用。
* 2.2.6.1. 如果/当promise fulfilled时，所有相应的onFulfilled回调必须按照它们对then的原始调用的顺序执行。
* 2.2.6.2. 如果/当promise rejected，则所有相应的onRejected回调都必须按照它们对then的原始调用的顺序执行。

2.2.7. 然后必须返回一个承诺[[3.3](###3.3)]。
```js
 promise2 = promise1.then(onFulfilled, onRejected);
```
* 2.2.7.1. 如果onFulfilled或onRejected返回值x，请运行Promise解析过程[[Resolve]]（promise2，x）。
* 2.2.7.2. 如果onFulfilled或onRejected抛出异常e，promise2必须以e为reason被rejected。
* 2.2.7.3. 如果onFulfilled不是一个函数，并且promise1已经fulfilled，则promise2必须为fulfilled且值与promise1相同
* 2.2.7.4. 如果onRejected不是函数，并且promise1被rejected，则promise2必须为rejected且reason与promise1相同。












