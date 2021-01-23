function Parent() {
  this.name = 'p';
}

function Child() {
  this.name = 'c';
  Parent.call(this)
}

Child.prototype = new Parent();

function create(Parent) {
  function Child() {
    Parent.call(this)
  }
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  return Child;
}

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  return function (...extraArgs) {
    return fn.call(context, ...args.concat(extraArgs));
  }
}
