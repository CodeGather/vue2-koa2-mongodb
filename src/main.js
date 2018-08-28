import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import VueOccupy from 'vue-occupy'
import FastClick from 'fastclick'
import store from './store'
import axios from 'axios'
import App from './App'
Vue.use(VueOccupy)
Vue.use(VueRouter)

Vue.prototype.$http = axios
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
