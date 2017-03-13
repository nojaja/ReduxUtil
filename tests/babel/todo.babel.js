var todochild=[];

class Todos extends JQueryComponent {
  // Reducer:
  reducer(state= [], action) {
    switch (action.type) {
      case 'ADD_TODO':
          var todo = new Todo('todo'+action.id,'#todo');
          todochild.push(todo);
        return state.concat([
          todo.reducer(undefined, action)
        ]);
      // toggleTodo
      case 'TOGGLE_TODO':
        return state.map(todoItem => Todo.prototype.reducer(todoItem, action));
      case 'SET_VISIBILITY_FILTER':
        return state.map(todoItem => Todo.prototype.reducer(todoItem, action));
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
      
      todo.render(todo.$,state[i],todo.prototype);
    }
  }
}

// TODO
class Todo extends JQueryComponent {
  // Reducer:
  reducer(todoItem, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false,
          filter: true
        };
      // toggleTodo
      case 'TOGGLE_TODO':
        var targetid = "todo"+todoItem.id
        console.log(targetid);
        console.log(action.id);
        if (action.id != targetid) {
          return todoItem;
        }
        return Object.assign({}, todoItem, {
          completed: !todoItem.completed
        });
      // filter
      case 'SET_VISIBILITY_FILTER':
        switch (action.filter) {
        case 'SHOW_ALL':
          return  Object.assign({}, todoItem, {
            filter: true });
        case 'SHOW_COMPLETED':
          return Object.assign({}, todoItem, {
            filter: todoItem.completed }); 
        case 'SHOW_ACTIVE':
          return Object.assign({}, todoItem, {
            filter: !todoItem.completed }); 
        default:
          return todoItem;
      }
      default:
        return todoItem;
    }
  }
  preRender($this) {}
  render($this, state, prototype) {
    console.log($this,state);
    if(state.completed){
      $this.css('textDecoration','line-through');
    }else{
      $this.css('textDecoration','none');
    }
    $this.text(state.text).show();
    if(!state.filter){
      $this.hide();
    }else{
      $this.show();
    }
  }
}


class VisibleFilter extends JQueryComponent {
  // Reducer:
  reducer(state = { filter: 'SHOW_ALL' }, action) {
    switch (action.type) {
      case 'LINK':    
        return {filter: action.filter};
      default:
        return state;
    }
  }
  preRender($this) {
    $this.find("a").click( function() {
      console.log($(this).attr("id"));
      var filter = $(this).attr("id")
      actionCreators.setFilter(filter)
      actionCreators.mapStateToTodoListProps(filter);
    });
  }
  render($this, state) {
    $this.find("a").attr("href","#");
    $this.find("#"+state.filter).removeAttr("href");
  }
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

// toggleTodo
class ToggleTodo extends JQueryComponent {
  // Reducer:
  reducer(state = { count: 0 }, action) {
    return state;
  }
  preRender($this) {
    $this.click( function() {
      console.log($(this).attr("id"));
      actionCreators.toggleTodo($(this).attr("id"));
    });
  }
  render($this, state) {}
}


let todoMaxId = 1;
var reduxUtil = new ReduxUtil();
reduxUtil.addComponent(new AddTodo("AddTodo"));
// toggleTodo
reduxUtil.addComponent(new ToggleTodo("Todos li"));
// visible
reduxUtil.addComponent(new VisibleFilter("Filter"));
reduxUtil.addComponent(new Todos("Todos"));

reduxUtil.createStore();
// Action:
var actionCreators = { //action creators
  addTodo: function(text) {
    reduxUtil.dispatch({
      type: 'ADD_TODO',
      id: todoMaxId++,
      text
    });
  },
  // toggleTodo
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
  mapStateToTodoListProps: function(filter) {
    reduxUtil.dispatch({
      type: 'LINK',
      filter
    });
  },
}
