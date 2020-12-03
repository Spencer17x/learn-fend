const CompilerUtils = {
  /**
   * 从vm.$data中获取值
   * @param {*} vm 
   * @param {*} directiveVal 
   */
  getVal(vm, directiveVal) {
    return directiveVal.split('.').reduce((acc, cur) => {
      return acc[cur];
    }, vm.$data);
  },
  /**
   * v-text
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   */
  text(vm, node, directiveVal) {
    let val;
    const text = node.textContent;
    const regexp = /\{\{(.+?)\}\}/g;
    if (regexp.test(text)) {
      val = text.replace(regexp, (...args) => {
        return this.getVal(vm, args[1]);
      });
    } else {
      val = this.getVal(vm, directiveVal);
    }
    node.textContent = val;
  },
  /**
   * v-html
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   */
  html(vm, node, directiveVal) {
    const val = this.getVal(vm, directiveVal);
    node.innerHTML = val;
  },
  /**
   * v-model
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   */
  model(vm, node, directiveVal) {
    const val = this.getVal(vm, directiveVal);
    node.innerHTML = val;
  },
  /**
   * v-on
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   * @param {*} directiveName 
   */
  on(vm, node, directiveVal, directiveName) {
    const eventHandler = vm.$options.methods[directiveVal];
    node.addEventListener(directiveName, eventHandler.bind(vm), false)
  }
}

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    const fragment = this.nodeToFragment(this.el);
    this.compile(fragment, vm);
    this.el.appendChild(fragment);
  }

  /**
   * 编译入口
   * @param {*} el 
   */
  compile(el, vm) {
    const childNodes = el.childNodes;
    [...childNodes].forEach(childNode => {
      if (this.isElementNode(childNode)) {
        this.compileElement(childNode, vm);
      } else if (this.isTextNode(childNode)) {
        this.compileText(childNode, vm);
      }
      if (childNode.childNodes && childNode.childNodes.length) {
        this.compile(childNode, vm);
      }
    });
  }

  /**
   * 编译元素节点
   * @param {*} node 
   * @param {*} vm 
   */
  compileElement(node, vm) {
    const attrNames = node.getAttributeNames();
    attrNames.forEach(attrName => {
      if (this.isDirective(attrName)) {
        this.compilerDirective(attrName, node, vm);
      }
    });
  }

  /**
   * 编译文本节点
   * @param {*} node 
   * @param {*} vm 
   */
  compileText(node, vm) {
    const regexp = /\{\{(.+?)\}\}/;
    if (regexp.test(node.textContent)) {
      CompilerUtils.text(vm, node);
    }
  }

  /**
   * 编译指令
   * @param {*} attrName 
   */
  compilerDirective(attrName, node, vm) {
    // v-text => directive -> 'text'
    // v-on => on
    const [, directive] = attrName.split('-');
    const [directiveType, directiveName] = directive.split(':');
    const directiveVal = this.getDirectiveVal(node, attrName);
    CompilerUtils[directiveType](vm, node, directiveVal, directiveName);
  }

  /**
   * 获取指令绑定的值
   * @param {*} node 
   * @param {*} attrName 
   */
  getDirectiveVal(node, attrName) {
    return node.getAttribute(attrName);
  }

  /**
   * 判断属性是否为指令
   * @param {*} value 
   */
  isDirective(attr) {
    return attr.startsWith('v-');
  }

  /**
   * 是否是元素节点
   * @param {*} el 
   */
  isElementNode(el) {
    return el.nodeType === 1;
  }

  /**
   * 是否是文本节点
   * @param {*} el 
   */
  isTextNode(el) {
    return el.nodeType === 3
  }


  /**
   * 转为文档碎片
   * @param {*} domEle 
   */
  nodeToFragment(domEle) {
    let firstChild;
    const fragment = document.createDocumentFragment();
    while (firstChild = domEle.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }


}

class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      new Compiler(this.$el, this);
    }
  }
}