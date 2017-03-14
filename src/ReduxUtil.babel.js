
/***********************************************
Copyright 2017 - 2017 
***********************************************/
/* v1.0.0 */

/*------------------------------------------------
ReduxUtil 
------------------------------------------------*/
export default class ReduxUtil {
  constructor() {
    var self = this;
    ReduxUtil.instance = this;
    this.components = {};
    this.reducers = {};
    this.subscribes = {};
    this.reducer;
    this.store;
  }
  addComponent(component) {
    this.components[component.id] = component;
    this.reducers[component.id] = component.reducer;
    this.subscribes[component.id] = component.subscribe;
  }

  createStore(initialState) { // Store:
    this.reducer = Redux.combineReducers(this.reducers);
    this.store = Redux.createStore(this.reducer, initialState);
    for (var key in this.subscribes) {
      this.components[key].setStore(this.store);
    }
    this.store.subscribe(this.subscribe);
    this.subscribe();
  }
  subscribe() {
    for (var key in ReduxUtil.instance.components) {
      ReduxUtil.instance.components[key].subscribe();
    }
  }
  dispatch(event) {
    return this.store.dispatch(event);
  }
  getStore() {
    return this.store;
  }
}