import Vue from 'vue';
import Promise from 'es6-promise';
import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux';

Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

const Message = {};
Message.install = () => {
  const msg = {
    $toast: config => { // 提示类消息
      let def = {
        type: 'text',
        width: '12em',
        text: ''
      };
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.toast.show({
          type: 'text',
          text: config
        });
      } else {
        Vue.$vux.toast.show(Object.assign(def, config));
      }
    },
    $alert: config => { // 弹窗信息单按钮
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        buttonText: '确定'
      };
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.alert.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.alert.show(Object.assign(def, config));
      }
    },
    $confirm: config => { // 弹出确认信息双按钮
      let isConfirm = false;
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          isConfirm = true;
        }
      };
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.confirm.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.confirm.show(Object.assign(def, config));
      };
      return new Promise((resolve, reject) => {
        if (isConfirm) {
          resolve();
        }
      });
    },
    $showLoading: config => { // 等待框
      let def = {
        text: '加载中...'
      };
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.loading.show(Object.assign(def, {
          text: config
        }));
      } else {
        Vue.$vux.loading.show(Object.assign(def, config));
      }
    }
  };
  Object.entries(msg).forEach(([method, fn]) => {
    Vue.prototype[method] = fn;
  });
};
export default Message;
