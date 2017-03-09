var todochild=[];

class Todos extends JQueryComponent {
  // Reducer:
  reducer(state= [], action) {
    switch (action.type) {
      case 'ADD_TODO':
          var todo = new Todo('todo'+action.id,'#todo');
          //this.child.push(todo); //←thisが指定されてcallしてるので参照出来ない、childはstateに持たせたくない
          todochild.push(todo);
        return state.concat([
          todo.reducer(undefined, action)
        ]);
      case 'TOGGLE_TODO':
        return state.map(todoItem => todo(todoItem, action));
      default:
        return state;
    }
  }
  preRender($this) {
  }
  render($this, state) {
    
    //var html = "";
    for(var i=0; i<state.length; i++){
      console.log(state[i]);
      console.log(todochild[i]);
      var todo = todochild[i];
      
      //html += todo.render(todo.$,state[i]);
      todo.render(todo.$,state[i],todo.prototype);
    }
    //$this.html(html);
  }
}

class Todo extends JQueryComponent {
  // Reducer:
  reducer(todoItem, action) {
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
  preRender($this) {}
  render($this, state, prototype) {
    
    console.log($this,state);
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
}

class VisibilityFilter extends JQueryComponent {
  // Reducer:
  reducer(state = 'SHOW_ALL', action) {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
  }
  preRender($this) {}
  render($this, state) {}
}



class AddTodo extends JQueryComponent {
  // Reducer:
  reducer(state = { count: 0 }, action) {
    return state;
  }
  preRender($this) {
    $this.find("button").click( function() {
      actionCreators.addTodo($this.find("#todoTextInput").val());
      $this.find("#todoTextInput").val("");
    });
  }
  render($this, state) {}
}

let todoMaxId = 1;
var reduxUtil = new ReduxUtil();

reduxUtil.addComponent(new AddTodo("AddTodo"));
reduxUtil.addComponent(new Todos("Todos"));

reduxUtil.createStore();
// Action:
var actionCreators = { //action creators
  increase: function() {
    reduxUtil.dispatch({
      type: 'increase'
    });
  },
  addTodo: function(text) {
    reduxUtil.dispatch({
      type: 'ADD_TODO',
      id: todoMaxId++,
      text
    });
  },
  toggleTodo: function(id) {
    reduxUtil.dispatch({
      type: 'TOGGLE_TODO',
      id
    });
  },
  setFilter: function(filter) {
    reduxUtil.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  },
}

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}