var todochild = [];

class Todos extends BaseComponent {
  // Reducer:
  reducer(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        var todo = new Todo('todo' + action.id, '#todo');
        //this.child.push(todo); //←thisが指定されてcallしてるので参照出来ない、childはstateに持たせたくない
        todochild.push(todo);
        return state.concat([
          todo.reducer(undefined, action)
        ]);
      case 'TOGGLE_TODO':
        return state.map(function (todoItem) {
          return Todo.prototype.reducer(todoItem, action);
        });
      default:
        return state;
    }
  }
}

// TODO
class Todo extends BaseComponent {
  // Reducer:
  reducer(todoItem, action) {
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
  }
}

class VisibilityFilter extends BaseComponent {
  // Reducer:
  reducer(state = 'SHOW_ALL', action) {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
  }
}


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
    console.log("setFilter",filter);
    reduxUtil.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  },
}

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }

  return ( <
    a href = '#'
    onClick = {
      e => {
        e.preventDefault();
        actionCreators.setFilter(filter);
      }
    } >
    {
      children
    } <
    /a>
  );
}

const getVisibleTodos = (todos, visibilityFilter) => {
  console.log("getVisibleTodos",todos,visibilityFilter);
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

class TodoApp extends React.Component {
  render() {
    console.log("TodoApp",this.props);
    const todos = this.props['Todos'];
    const visibilityFilter = this.props['visibilityFilter'];
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return (
      <div>
        <input type='text' ref={node => {
            this.input = node;
        }} />
        <button onClick={() => {
            actionCreators.addTodo(this.input.value);
            this.input.value = '';
          }}>
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li key={todo.id}
                onClick={() => {
                  actionCreators.toggleTodo(todo.id);
                }}
                style={{
                  textDecoration:
                    todo.completed ?
                      'line-through' :
                      'none'
                }}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

class ReactRoot extends BaseComponent {
  constructor(id) {
    super();
    this.id = id; //部品のID
  }
  subscribe() {
    ReactDOM.render(
      <TodoApp
      {...this.store.getState()}
    />,
      document.getElementById('root')
    );
  }
}

let todoMaxId = 1;
var reduxUtil = new ReduxUtil();
reduxUtil.addComponent(new Todos("Todos"));
reduxUtil.addComponent(new VisibilityFilter("visibilityFilter"));
reduxUtil.addComponent(new ReactRoot("root"));

reduxUtil.createStore();
      
