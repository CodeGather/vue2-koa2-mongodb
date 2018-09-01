import Vue from 'vue';
import router from './router/index';
import VueOccupy from 'vue-occupy';
import FastClick from 'fastclick';
import store from './store';
import Message from './store/message';
import axios from 'axios';
import App from './App';

Vue.use(Message);  // 消息集中管理
Vue.use(VueOccupy);

Vue.prototype.$http = axios;
FastClick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
