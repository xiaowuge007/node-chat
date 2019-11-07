import Vue from 'vue';
import { isFunction } from './common'
//长按事件
let time;//延迟器
let longFn;
let flag = true;
Vue.directive('longClick', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding) {
    // 聚焦元素
    if(isFunction(binding.value)){
      longFn = tapEvent(binding.value)
      el.addEventListener('touchstart',longFn)
      el.addEventListener('touchmove',longFn)
      el.addEventListener('touchend',longFn)
    }
  },
  unbind: function(el) {
    if(longFn && isFunction(longFn)){
      el.removeEventListener('touchstart',longFn)
      el.removeEventListener('touchmove',longFn)
      el.removeEventListener('touchend',longFn)
    }
  }
})
function tapEvent(fn) {
  return function(e) {
    if(e.type === 'touchstart'){
      time = setTimeout(()=>{
        fn();
      },500)
    }else if(e.type === 'touchmove'){
      clearTimeout(time)
      e.preventDefault();
    }else if(e.type === 'touchend'){
      clearTimeout(time)
    }
  }
}
