(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.BaseComponentBabel = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var BaseComponent = function () {
    /**コンストラクタ**/
    function BaseComponent(id) {
      _classCallCheck(this, BaseComponent);

      this.id = id; //部品のID
      this.store = {};
    }

    _createClass(BaseComponent, [{
      key: "reducer",
      value: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];
        // Reducer:
        return state;
      }
    }, {
      key: "subscribe",
      value: function subscribe() {}
    }, {
      key: "setStore",
      value: function setStore(store) {
        this.store = store;
      }
    }, {
      key: "getStore",
      value: function getStore() {
        return this.store;
      }
    }]);

    return BaseComponent;
  }();

  exports.default = BaseComponent;
});

},{}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseComponent.babel.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseComponent.babel.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseComponentBabel);
    global.JQueryComponentBabel = mod.exports;
  }
})(this, function (exports, _BaseComponentBabel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _BaseComponentBabel2 = _interopRequireDefault(_BaseComponentBabel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var JQueryComponent = function (_BaseComponent) {
    _inherits(JQueryComponent, _BaseComponent);

    /**
    コンストラクタ
    id:部品のID
    selector:部品のdomが見つからない場合に利用するdomを指定するセレクタ
    **/
    function JQueryComponent(id, selector) {
      _classCallCheck(this, JQueryComponent);

      var _this = _possibleConstructorReturn(this, (JQueryComponent.__proto__ || Object.getPrototypeOf(JQueryComponent)).call(this));

      _this.id = id; //部品のID
      _this.child = [];
      _this.$ = $("#" + id);
      _this.prototype = selector ? $(selector) : _this.$; //雛形を保持
      if (!_this.$.length && selector) {
        _this.$ = _this.prototype.clone(true).attr('id', id);
        _this.prototype.parent().append(_this.$);
      }
      //if(!this.$.length&&selector)this.$ = $(selector);
      _this.preRender(_this.$);
      return _this;
    }

    _createClass(JQueryComponent, [{
      key: 'reducer',
      value: function reducer(state, action) {
        // Reducer:
        return state;
      }
    }, {
      key: 'preRender',
      value: function preRender($this, prototype) {}
    }, {
      key: 'render',
      value: function render($this, state, prototype) {}
    }, {
      key: 'subscribe',
      value: function subscribe() {
        console.log("getState", this.store.getState());
        this.render(this.$, this.store.getState()[this.id], this.prototype);
      }
    }, {
      key: 'getId',
      value: function getId() {
        return this.id;
      }
    }, {
      key: 'get$this',
      value: function get$this() {
        return this.$;
      }
    }]);

    return JQueryComponent;
  }(_BaseComponentBabel2.default);

  exports.default = JQueryComponent;
});

},{"./BaseComponent.babel.js":1}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.ReduxUtilBabel = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var ReduxUtil = function () {
    function ReduxUtil() {
      _classCallCheck(this, ReduxUtil);

      var self = this;
      ReduxUtil.instance = this;
      this.components = {};
      this.reducers = {};
      this.subscribes = {};
      this.reducer;
      this.store;
    }

    _createClass(ReduxUtil, [{
      key: "addComponent",
      value: function addComponent(component) {
        this.components[component.id] = component;
        this.reducers[component.id] = component.reducer;
        this.subscribes[component.id] = component.subscribe;
      }
    }, {
      key: "createStore",
      value: function createStore(initialState) {
        // Store:
        this.reducer = Redux.combineReducers(this.reducers);
        this.store = Redux.createStore(this.reducer, initialState);
        for (var key in this.subscribes) {
          this.components[key].setStore(this.store);
        }
        this.store.subscribe(this.subscribe);
        this.subscribe();
      }
    }, {
      key: "subscribe",
      value: function subscribe() {
        for (var key in ReduxUtil.instance.components) {
          ReduxUtil.instance.components[key].subscribe();
        }
      }
    }, {
      key: "dispatch",
      value: function dispatch(event) {
        return this.store.dispatch(event);
      }
    }, {
      key: "getStore",
      value: function getStore() {
        return this.store;
      }
    }]);

    return ReduxUtil;
  }();

  exports.default = ReduxUtil;
});

},{}],4:[function(require,module,exports){
(function (global){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./BaseComponent.babel.js', './JQueryComponent.babel.js', './ReduxUtil.babel.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./BaseComponent.babel.js'), require('./JQueryComponent.babel.js'), require('./ReduxUtil.babel.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.BaseComponentBabel, global.JQueryComponentBabel, global.ReduxUtilBabel);
    global.indexBabel = mod.exports;
  }
})(this, function (_BaseComponentBabel, _JQueryComponentBabel, _ReduxUtilBabel) {
  'use strict';

  var _BaseComponentBabel2 = _interopRequireDefault(_BaseComponentBabel);

  var _JQueryComponentBabel2 = _interopRequireDefault(_JQueryComponentBabel);

  var _ReduxUtilBabel2 = _interopRequireDefault(_ReduxUtilBabel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  if (typeof window === 'undefined') {
    global.ReduxUtil = _ReduxUtilBabel2.default;
    global.BaseComponent = _BaseComponentBabel2.default;
    global.JQueryComponent = _JQueryComponentBabel2.default;
  } else {
    window.ReduxUtil = _ReduxUtilBabel2.default;
    window.BaseComponent = _BaseComponentBabel2.default;
    window.JQueryComponent = _JQueryComponentBabel2.default;
  }
  /***********************************************
  Copyright 2017 - 2017 
  ***********************************************/
  /* v1.0.0 */
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./BaseComponent.babel.js":1,"./JQueryComponent.babel.js":2,"./ReduxUtil.babel.js":3}]},{},[4]);
