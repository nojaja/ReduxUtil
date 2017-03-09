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
    global.todoBabel = mod.exports;
  }
})(this, function () {
  'use strict';

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

  var todochild = [];

  var Todos = function (_JQueryComponent) {
    _inherits(Todos, _JQueryComponent);

    function Todos() {
      _classCallCheck(this, Todos);

      return _possibleConstructorReturn(this, (Todos.__proto__ || Object.getPrototypeOf(Todos)).apply(this, arguments));
    }

    _createClass(Todos, [{
      key: 'reducer',
      value: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var action = arguments[1];

        switch (action.type) {
          case 'ADD_TODO':
            var todo = new Todo('todo' + action.id, '#todo');
            //this.child.push(todo); //←thisが指定されてcallしてるので参照出来ない、childはstateに持たせたくない
            todochild.push(todo);
            return state.concat([todo.reducer(undefined, action)]);
          case 'TOGGLE_TODO':
            return state.map(function (todoItem) {
              return todo(todoItem, action);
            });
          default:
            return state;
        }
      }
    }, {
      key: 'preRender',
      value: function preRender($this) {}
    }, {
      key: 'render',
      value: function render($this, state) {

        //var html = "";
        for (var i = 0; i < state.length; i++) {
          console.log(state[i]);
          console.log(todochild[i]);
          var todo = todochild[i];

          //html += todo.render(todo.$,state[i]);
          todo.render(todo.$, state[i], todo.prototype);
        }
        //$this.html(html);
      }
    }]);

    return Todos;
  }(JQueryComponent);

  var Todo = function (_JQueryComponent2) {
    _inherits(Todo, _JQueryComponent2);

    function Todo() {
      _classCallCheck(this, Todo);

      return _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).apply(this, arguments));
    }

    _createClass(Todo, [{
      key: 'reducer',
      value: function reducer(todoItem, action) {
        switch (action.type) {
          case 'ADD_TODO':
            return {
              id: action.id,
              text: action.text,
              completed: false
            };
          case 'TOGGLE_TODO':
            if (action.id != todoItem.id) {
              return todoItem;
            }
            return Object.assign({}, todoItem, {
              completed: !todoItem.completed
            });
          default:
            return todoItem;
        }
      }
    }, {
      key: 'preRender',
      value: function preRender($this) {}
    }, {
      key: 'render',
      value: function render($this, state, prototype) {

        console.log($this, state);
        /*
        if($this.length < 1){//存在しない場合
          var dom = prototype.clone();//雛形から複製
          dom.attr('id','todo'+state.id);
          dom.text(state.text);
          dom.appendTo("#Todos2");
          //prototype.after(dom);
          $this=dom;
        }
        */
        $this.text(state.text).show();

        //return `<li style="text-decoration: none;">${state.text}</li>`
      }
    }]);

    return Todo;
  }(JQueryComponent);

  var VisibilityFilter = function (_JQueryComponent3) {
    _inherits(VisibilityFilter, _JQueryComponent3);

    function VisibilityFilter() {
      _classCallCheck(this, VisibilityFilter);

      return _possibleConstructorReturn(this, (VisibilityFilter.__proto__ || Object.getPrototypeOf(VisibilityFilter)).apply(this, arguments));
    }

    _createClass(VisibilityFilter, [{
      key: 'reducer',
      value: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
        var action = arguments[1];

        switch (action.type) {
          case 'SET_VISIBILITY_FILTER':
            return action.filter;
          default:
            return state;
        }
      }
    }, {
      key: 'preRender',
      value: function preRender($this) {}
    }, {
      key: 'render',
      value: function render($this, state) {}
    }]);

    return VisibilityFilter;
  }(JQueryComponent);

  var AddTodo = function (_JQueryComponent4) {
    _inherits(AddTodo, _JQueryComponent4);

    function AddTodo() {
      _classCallCheck(this, AddTodo);

      return _possibleConstructorReturn(this, (AddTodo.__proto__ || Object.getPrototypeOf(AddTodo)).apply(this, arguments));
    }

    _createClass(AddTodo, [{
      key: 'reducer',
      value: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { count: 0 };
        var action = arguments[1];

        return state;
      }
    }, {
      key: 'preRender',
      value: function preRender($this) {
        $this.find("button").click(function () {
          actionCreators.addTodo($this.find("#todoTextInput").val());
          $this.find("#todoTextInput").val("");
        });
      }
    }, {
      key: 'render',
      value: function render($this, state) {}
    }]);

    return AddTodo;
  }(JQueryComponent);

  var todoMaxId = 1;
  var reduxUtil = new ReduxUtil();

  reduxUtil.addComponent(new AddTodo("AddTodo"));
  reduxUtil.addComponent(new Todos("Todos"));

  reduxUtil.createStore();
  // Action:
  var actionCreators = { //action creators
    increase: function increase() {
      reduxUtil.dispatch({
        type: 'increase'
      });
    },
    addTodo: function addTodo(text) {
      reduxUtil.dispatch({
        type: 'ADD_TODO',
        id: todoMaxId++,
        text: text
      });
    },
    toggleTodo: function toggleTodo(id) {
      reduxUtil.dispatch({
        type: 'TOGGLE_TODO',
        id: id
      });
    },
    setFilter: function setFilter(filter) {
      reduxUtil.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
      });
    }
  };

  var getVisibleTodos = function getVisibleTodos(todos, visibilityFilter) {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(function (todo) {
          return todo.completed;
        });
      case 'SHOW_ACTIVE':
        return todos.filter(function (todo) {
          return !todo.completed;
        });
      default:
        return todos;
    }
  };
});

},{}]},{},[1]);
