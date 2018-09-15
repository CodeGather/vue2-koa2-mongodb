import Vue from 'vue';
import Message from './store/message';
import router from './router/index';
import VueIniti from 'vue-initi';
import FastClick from 'fastclick';
import store from './store';
import App from './App';
import {
  Group,
  Cell,
  PopupPicker,
  LoadMore,
  Flexbox,
  FlexboxItem,
  Swiper,
  Divider,
  XImg,
  Box,
  XButton,
  ViewBox,
  Search,
  XInput,
  Tabbar,
  TabbarItem
} from 'vux';

// Vue.use(WechatPlugin);
// console.log(Vue.wechat); // 可以直接访问 wx 对象。

Vue.component(Group.name, Group);
Vue.component(Cell.name, Cell);
Vue.component(PopupPicker.name, PopupPicker);
Vue.component(LoadMore.name, LoadMore);
Vue.component(Flexbox.name, Flexbox);
Vue.component(FlexboxItem.name, FlexboxItem);
Vue.component(Swiper.name, Swiper);
Vue.component(Divider.name, Divider);
Vue.component(XImg.name, XImg);
Vue.component(Box.name, Box);
Vue.component(XButton.name, XButton);
Vue.component(ViewBox.name, ViewBox);
Vue.component(Search.name, Search);
Vue.component(XInput.name, XInput);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabbarItem.name, TabbarItem);

Vue.use(Message); // 消息集中管理
Vue.use(VueIniti);

FastClick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
