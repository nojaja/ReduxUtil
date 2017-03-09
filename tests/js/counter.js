(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.counterBabel = mod.exports;
  }
})(this, function () {
  "use strict";

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

  var Counter = function (_JQueryComponent) {
    _inherits(Counter, _JQueryComponent);

    function Counter() {
      _classCallCheck(this, Counter);

      return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).apply(this, arguments));
    }

    _createClass(Counter, [{
      key: "reducer",
      value: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          count: 0
        };
        var action = arguments[1];

        switch (action.type) {
          case 'increase':
            return {
              count: state.count + 1
            };
          default:
            return state;
        }
      }
    }, {
      key: "preRender",
      value: function preRender($this) {
        $this.click("button", function () {
          actionCreators.increase();
        });
      }
    }, {
      key: "render",
      value: function render($this, state) {
        $this.find("span").text(state.count);
      }
    }]);

    return Counter;
  }(JQueryComponent);

  var reduxUtil = new ReduxUtil();
  reduxUtil.addComponent(new Counter("test"));
  reduxUtil.createStore();
  // Action:
  var actionCreators = { //action creators
    increase: function increase() {
      reduxUtil.dispatch({
        type: 'increase'
      });
    }
  };
});

},{}]},{},[1]);
