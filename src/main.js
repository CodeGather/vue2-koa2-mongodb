import Vue from 'vue';
import router from './router/index';
import VueIniti from 'vue-initi';
import FastClick from 'fastclick';
import store from './store';
import Message from './store/message';
import App from './App';

Vue.use(Message); // 消息集中管理
Vue.use(VueIniti);

FastClick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
