import Vue from 'vue';
import Vuex from 'vuex';
import {
  setStore,
  getStore,
  removeStore
} from '@/config/utils';

Vue.use(Vuex);

// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录

const state = {
  token: getStore('token'), // 获取token
  username: '', // 用户名初始值
  direction: 'forward',
  isLoading: false, // 页面切换显示loading
  isWechat: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') < 0) {
      return true;
    } else {
      return false;
    }
  }
};

const mutations = {
  LOGIN: (state, data) => {
    // 更改token的值
    state.token = data;
    setStore('token', data);
  },
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.token = null;
    removeStore('token');
  },
  USERNAME: (state, data) => {
    // 把用户名存起来
    state.username = data;
    setStore('id', data.id);
    setStore('openid', data.openid);
    setStore('studentNumber', data.studentNumber);
  },
  UPDATELOADINGSTATUS: (state, payload) => {
    // 更新loading显示状态
    state.isLoading = payload.isLoading;
  },
  UPDATE_DIRECTION: (state, payload) => {
    // 使用direction来控制页面切换的动画
    state.direction = payload.direction;
  }
};

const actions = {
  UserLogin: ({
    commit
  }, data) => {
    commit('LOGIN', data);
  },
  UserLogout: ({
    commit
  }) => {
    commit('LOGOUT');
  },
  UserName: ({
    commit
  }, data) => {
    commit('USERNAME', data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
