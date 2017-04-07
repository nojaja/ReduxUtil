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
    global.todo_with_reactBabel = mod.exports;
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

var Todos = function (_BaseComponent) {
  _inherits(Todos, _BaseComponent);

  function Todos() {
    _classCallCheck(this, Todos);

    return _possibleConstructorReturn(this, _BaseComponent.apply(this, arguments));
  }

  // Reducer:
  Todos.prototype.reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case 'ADD_TODO':
        var todo = new Todo('todo' + action.id, '#todo');
        //this.child.push(todo); //←thisが指定されてcallしてるので参照出来ない、childはstateに持たせたくない
        todochild.push(todo);
        return state.concat([todo.reducer(undefined, action)]);
      case 'TOGGLE_TODO':
        return state.map(function (todoItem) {
          return Todo.prototype.reducer(todoItem, action);
        });
      default:
        return state;
    }
  };

  return Todos;
}(BaseComponent);

// TODO

var Todo = function (_BaseComponent2) {
  _inherits(Todo, _BaseComponent2);

  function Todo() {
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, _BaseComponent2.apply(this, arguments));
  }

  // Reducer:
  Todo.prototype.reducer = function reducer(todoItem, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        };
      // toggleTodo
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
  };

  return Todo;
}(BaseComponent);

var VisibilityFilter = function (_BaseComponent3) {
  _inherits(VisibilityFilter, _BaseComponent3);

  function VisibilityFilter() {
    _classCallCheck(this, VisibilityFilter);

    return _possibleConstructorReturn(this, _BaseComponent3.apply(this, arguments));
  }

  // Reducer:
  VisibilityFilter.prototype.reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? 'SHOW_ALL' : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
  };

  return VisibilityFilter;
}(BaseComponent);

// Action:

var actionCreators = { //action creators
  addTodo: function addTodo(text) {
    reduxUtil.dispatch({
      type: 'ADD_TODO',
      id: todoMaxId++,
      text: text
    });
  },
  // toggleTodo
  toggleTodo: function toggleTodo(id) {
    reduxUtil.dispatch({
      type: 'TOGGLE_TODO',
      id: id
    });
  },
  setFilter: function setFilter(filter) {
    console.log("setFilter", filter);
    reduxUtil.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: filter
    });
  }
};

var FilterLink = function FilterLink(_ref) {
  var filter = _ref.filter;
  var currentFilter = _ref.currentFilter;
  var children = _ref.children;

  if (filter === currentFilter) {
    return React.createElement(
      'span',
      null,
      children
    );
  }

  return React.createElement(
    'a',
    { href: '#',
      onClick: function onClick(e) {
        e.preventDefault();
        actionCreators.setFilter(filter);
      } },
    children,
    ' '
  );
};

var getVisibleTodos = function getVisibleTodos(todos, visibilityFilter) {
  console.log("getVisibleTodos", todos, visibilityFilter);
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

var TodoApp = function (_React$Component) {
  _inherits(TodoApp, _React$Component);

  function TodoApp() {
    _classCallCheck(this, TodoApp);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  TodoApp.prototype.render = function render() {
    var _this5 = this;

    console.log("TodoApp", this.props);
    var todos = this.props['Todos'];
    var visibilityFilter = this.props['visibilityFilter'];
    var visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return React.createElement(
      'div',
      null,
      React.createElement('input', { type: 'text', ref: function ref(node) {
          _this5.input = node;
        } }),
      React.createElement(
        'button',
        { onClick: function onClick() {
            actionCreators.addTodo(_this5.input.value);
            _this5.input.value = '';
          } },
        'Add Todo'
      ),
      React.createElement(
        'ul',
        null,
        visibleTodos.map(function (todo) {
          return React.createElement(
            'li',
            { key: todo.id,
              onClick: function onClick() {
                actionCreators.toggleTodo(todo.id);
              },
              style: {
                textDecoration: todo.completed ? 'line-through' : 'none'
              } },
            todo.text
          );
        })
      ),
      React.createElement(
        'p',
        null,
        'Show:',
        ' ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_ALL',
            currentFilter: visibilityFilter
          },
          'All'
        ),
        ' ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_ACTIVE',
            currentFilter: visibilityFilter
          },
          'Active'
        ),
        ' ',
        React.createElement(
          FilterLink,
          {
            filter: 'SHOW_COMPLETED',
            currentFilter: visibilityFilter
          },
          'Completed'
        )
      )
    );
  };

  return TodoApp;
}(React.Component);

var ReactRoot = function (_BaseComponent4) {
  _inherits(ReactRoot, _BaseComponent4);

  function ReactRoot(id) {
    _classCallCheck(this, ReactRoot);

    var _this6 = _possibleConstructorReturn(this, _BaseComponent4.call(this));

    _this6.id = id; //部品のID
    return _this6;
  }

  ReactRoot.prototype.subscribe = function subscribe() {
    ReactDOM.render(React.createElement(TodoApp, this.store.getState()), document.getElementById('root'));
  };

  return ReactRoot;
}(BaseComponent);

var todoMaxId = 1;
var reduxUtil = new ReduxUtil();
reduxUtil.addComponent(new Todos("Todos"));
reduxUtil.addComponent(new VisibilityFilter("visibilityFilter"));
reduxUtil.addComponent(new ReactRoot("root"));

reduxUtil.createStore();

});
},{}]},{},[1]);
