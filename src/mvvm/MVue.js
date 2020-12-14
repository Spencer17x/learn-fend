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
   * 针对model深层对象处理数据
   * @param {*} vm 
   * @param {*} directiveVal 
   * @param {*} val 
   */
  setVal(vm, directiveVal, val) {
    return directiveVal.split('.').reduce((acc, cur) => {
      const isObject = acc[cur] && typeof acc[cur] === 'object';
      if (!isObject) {
        acc[cur] = val;
      }
      return acc[cur];
    }, vm.$data);
  },
  /**
   * 针对{{}}语法进行获取值的处理
   * @param {*} vm 
   * @param {*} text 
   */
  getContent(vm, text) {
    return text.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    })
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
        new Watcher(vm, args[1], () => {
          const newVal = this.getContent(vm, text);
          this.updater.textUpdater(node, newVal);
        })
        return this.getVal(vm, args[1]);
      });
    } else {
      val = this.getVal(vm, directiveVal);
      new Watcher(vm, directiveVal, newVal => {
        this.updater.textUpdater(node, newVal);
      });
    }
    this.updater.textUpdater(node, val);
  },
  /**
   * v-html
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   */
  html(vm, node, directiveVal) {
    const val = this.getVal(vm, directiveVal);
    new Watcher(vm, directiveVal, newVal => {
      node.innerHTML = newVal;
    });
    this.updater.htmlUpdater(node, val);
  },
  /**
   * v-model
   * @param {*} vm 
   * @param {*} node 
   * @param {*} directiveVal 
   */
  model(vm, node, directiveVal) {
    const val = this.getVal(vm, directiveVal);
    new Watcher(vm, directiveVal, newVal => {
      this.updater.modelUpdater(node, newVal);
    });
    this.updater.modelUpdater(node, val);
    node.addEventListener('input', event => {
      const inputVal = event.target.value;
      this.setVal(vm, directiveVal, inputVal);
    }, false);
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
  },
  
  updater: {
    /**
     * v-text更新
     * @param {*} node 
     * @param {*} val 
     */
    textUpdater(node, val) {
      node.textContent = val;
    },
    /**
     * v-html更新
     * @param {*} node 
     * @param {*} val 
     */
    htmlUpdater(node, val) {
      node.innerHTML = val;
    },
    /**
     * v-model更新
     * @param {*} node 
     * @param {*} val 
     */
    modelUpdater(node, val) {
      node.value = val;
    }
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
      new Observer(this.$data, this);
      new Compiler(this.$el, this);
    }
  }
}