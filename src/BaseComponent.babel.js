
/***********************************************
Copyright 2017 - 2017 
***********************************************/
/* v1.0.0 */

/*------------------------------------------------
ReduxUtil - BaseComponent
------------------------------------------------*/
export default class BaseComponent {
  /**コンストラクタ**/
  constructor() {
    this.store = {};
  }
  reducer(state, action) { // Reducer:
    return state;
  }
  subscribe() {}
  setStore(store) {
    this.store = store;
  }
  getStore() {
    return this.store;
  }
}