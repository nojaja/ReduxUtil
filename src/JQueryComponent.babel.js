
/***********************************************
Copyright 2017 - 2017 
***********************************************/
/* v1.0.0 */

/*------------------------------------------------
ReduxUtil - JQueryComponent
------------------------------------------------*/
export default class JQueryComponent extends BaseComponent {

  /**
  コンストラクタ
  id:部品のID
  selector:部品のdomが見つからない場合に利用するdomを指定するセレクタ
  **/
  constructor(id,selector) {
    super();
    this.id = id; //部品のID
    this.child=[];
    this.$ = $("#" + id);
    this.prototype = selector? $(selector) : this.$; //雛形を保持
    if(!this.$.length&&selector){
      this.$ = this.prototype.clone(true).attr('id',id);
      this.prototype.parent().append(this.$);
    }
    //if(!this.$.length&&selector)this.$ = $(selector);
    this.preRender(this.$);
  }
  reducer(state, action) { // Reducer:
    return state;
  }
  preRender($this, prototype) {}
  render($this, state, prototype) {}
  subscribe() {
    console.log("getState",this.store.getState());
    this.render(this.$, this.store.getState()[this.id], this.prototype);
  }
  getId() {
    return this.id;
  }
  get$this() {
    return this.$;
  }
}