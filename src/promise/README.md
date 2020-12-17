# Promises/A+

翻译：https://promisesaplus.com/

**这是一个开放的标准，实现者为实现者提供了良好的、可互操作的JavaScript promises。**

promise表示异步操作的最终结果。与promise交互的主要方式是通过其then方法，该方法注册回调以接收promise的最终值或promise无法实现的原因。

该规范详细描述了then方法的行为，提供了一个可互操作的基础，所有Promises/A+一致的promise实现都可以依赖于它来提供。因此，规范应该被认为是非常稳定的。尽管Promises/A+组织偶尔会对本规范进行一些小的向后兼容更改，以解决新发现的角落情况，但只有经过仔细考虑、讨论和测试后，我们才会集成较大或向后不兼容的更改。

从历史上看，Promises/A+澄清了早期 [Promises/A proposal](http://wiki.commonjs.org/wiki/Promises/A) 的行为条款，将其扩展到涵盖事实上的行为，并省略了未指定或有问题的部分。

最后，核心Promises/A+规范不涉及如何创建、实现或拒绝承诺，而是选择集中于提供可互操作的then方法。未来在配套规范中的工作可能会涉及到这些主题。

