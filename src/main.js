import Vue from 'vue';
import Message from './store/message';
import router from './router/index';
import VueIniti from 'vue-initi';
import FastClick from 'fastclick';
import store from './store';
import App from './App';
import {
  WechatPlugin
} from 'vux';

Vue.use(WechatPlugin);
console.log(Vue.wechat); // 可以直接访问 wx 对象。

Vue.use(Message); // 消息集中管理
Vue.use(VueIniti);

FastClick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
