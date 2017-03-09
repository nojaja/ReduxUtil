class Counter extends JQueryComponent {
  // Reducer:
  reducer(state = {
    count: 0
  }, action) {
    switch (action.type) {
      case 'increase':
        return {
          count: state.count + 1
        };
      default:
        return state;
    }
  }
  preRender($this) {
    $this.click("button", function() {
      actionCreators.increase();
    });
  }
  render($this, state) {
    $this.find("span").text(state.count);
  }
}

var reduxUtil = new ReduxUtil();
reduxUtil.addComponent(new Counter("test"));
reduxUtil.createStore();
// Action:
var actionCreators = { //action creators
  increase: function() {
    reduxUtil.dispatch({
      type: 'increase'
    });
  }
}
