import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录

const state = {
  token: window.sessionStorage.getItem('token'), // 获取token
  username: '', // 用户名初始值
  direction: 'forward',
  isLoading: false // 页面切换显示loading
};

const mutations = {
  LOGIN: (state, data) => {
    // 更改token的值
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
  USERNAME: (state, data) => {
    // 把用户名存起来
    state.username = data;
    window.sessionStorage.setItem('username', data);
  },
  UPDATELOADINGSTATUS: (state, payload) => {
    // 更新loading显示状态
    state.isLoading = payload.isLoading;
  },
  UPDATE_DIRECTION: (state, payload) => {
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
