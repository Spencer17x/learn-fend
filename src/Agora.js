// // // 已知
// // // array const array = [
// // //  {name: "wangqiang", city: "shanghai"},
// // //  {name: "lilei", city: "shanghai"},
// // //  {name: "chenhao", city: "hangzhou"},
// // //  {name: "zhangqiang", city: "nanjing"},
// // // ];
// // // 用代码转化成如下 map const map = {
// // // "shanghai": ["wangqiang", "lilei"],
// // // "hangzhou": ["chenhao"],
// // //  "nanjing": ["zhangqiang"],
// // //};
// //
// // const transformArrayToMap = array => {
// //   return array.reduce((total, cur) => {
// //     total[cur.city] = total[cur.city] || [];
// //     total[cur.city].push(cur.name);
// //     return total;
// //   }, {})
// // }
// //
// // const source = [
// //  {name: "wangqiang", city: "shanghai"},
// //  {name: "lilei", city: "shanghai"},
// //  {name: "chenhao", city: "hangzhou"},
// //  {name: "zhangqiang", city: "nanjing"},
// // ]
// //
// // console.log(transformArrayToMap(source));
//
// // 矩形
// class Rectangle extends Shape {
//   constructor(...args) {
//     super('Rectangle', ...args);
//   }
//   setPosition(x, y) {
//     this._x = x;
//     this._y = y;
//   }
//   setSize(width, height) {
//     this._width = width;
//     this._height = height;
//   }
//   paint(context) {
//     return super.paint(context);
//   }
//   hitTest(x, y) {
//     return super.hitTest(x, y);
//   }
// }
//
// // 椭圆
// class Ellipse extends Shape {
//   constructor(...args) {
//     super('Ellipse', ...args);
//   }
//   get radiusX() {
//     return this._width / 2;
//   }
//   get radiusY() {
//     return this._height / 2;
//   }
//   setPosition(x, y) {
//     this._x = x;
//     this._y = y;
//   }
//   setSize(width, height) {
//     this._width = width;
//     this._height = height;
//   }
//   paint(context) {
//     return super.paint(context);
//   }
//   hitTest(x, y) {
//     // TODO: to implemnts
//     return super.hitTest(x, y)
//   }
// }
//
// class Shape {
//   constructor(type, ...args) {
//     this._x = 0;
//     this._y = 0;
//     this._width = 0;
//     this._height = 0;
//     this.type = type;
//   }
//
//   get x() {
//     return this._x;
//   }
//   get y() {
//     return this._y;
//   }
//   get width() {
//     return this._width;
//   }
//   get height() {
//     return this._height;
//   }
//
//   hitTest(x, y) {
//     if (this.type === 'Rectangle') return (
//       x >= this._x && x <= this._x + this._width &&
//       y >= this._y && y <= this._y + this._height
//     );
//     if (this.type === 'Ellipse') return false;
//   }
//
//   paint(context) {
//     if (this.type === 'Ellipse') {
//       const x = this._x + this.radiusX; const y =this._y + this.radiusY;
//       context.beginPath();
//       context.ellipse(x, y, this.radiusX, this.radiusY, 0.0, 0.0, 2.0 * Math.PI);
//       context.stroke();
//       return;
//     }
//     if (this.type === 'Rectangle') {
//       context.strokeRect(this._x, this._y, this._width, this._height);
//       return;
//     }
//   }
// }
//


// 用 fetch 方法方法获取
// https://netless.link/info.json
// 这个 URL 的内容，要求:如果 5 秒没返回内容，
// 则抛出 new Error(“timeout”) 错误。
// 提示，可以用 async、await 来写代码。

const timeout = ms => {
  let timer;
  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      reject();
    }, ms)
  })
  return [timer, promise];
}

const request = () => {
  const controller = new AbortController();
  let signal = controller.signal;
  const [timer, timeoutReq] = timeout(5000)
  return Promise.race([
    timeoutReq,
    fetch('https://netless.link/info.json', {signal})
  ]).then(res => {
    if (timer) {
      clearTimeout(timer);
    }
  }).catch(() => {
    controller.abort();
    throw new Error('timeout');
  });
}

// 判断一个点是否在椭圆内