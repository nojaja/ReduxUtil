
/***********************************************
Copyright 2017 - 2017 
***********************************************/
/* v1.0.0 */

import ReduxUtil from './ReduxUtil.babel.js'
import BaseComponent from './BaseComponent.babel.js'
import JQueryComponent from './JQueryComponent.babel.js'

if (typeof window === 'undefined') {
global.ReduxUtil = ReduxUtil;
global.BaseComponent = BaseComponent;
global.JQueryComponent = JQueryComponent;
}else{
window.ReduxUtil = ReduxUtil;
window.BaseComponent = BaseComponent;
window.JQueryComponent = JQueryComponent;
}