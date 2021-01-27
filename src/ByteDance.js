/**
 * 1. 二叉树的左视图
 */
function leftViewTree(treeNode) {

}

/**
 * 2. koa middleware-洋葱模型
 * 要求输出1-3-5-4-2
 * @type {{middlewares: [], use(*=): void}}
 */
const app = {
  middlewares: [],
  use(middleware) {
    this.middlewares.push(middleware);
  },
  run() {
    const runTask = this.middlewares.shift();
    const next = () => {
      if (this.middlewares.length) {
        this.run();
      }
    };
    runTask(next);
  }
}

app.use(next => {
  console.log(1);
  next();
  console.log(2)
});

app.use(next => {
  console.log(3);
  next();
  console.log(4)
});

app.use(() => {
  console.log(5);
});

app.run(); // 要求输出1-3-5-4-2

