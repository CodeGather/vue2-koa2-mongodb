import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const home = r => require.ensure([], () => r(require('@/page/Home')), 'home');
const login = r => require.ensure([], () => r(require('@/page/Login')), 'login');
const courseList = r => require.ensure([], () => r(require('@/page/CourseList')), 'courseList');
const personal = r => require.ensure([], () => r(require('@/page/Personal')), 'personal');

const router = new Router({
  mode: 'history',
  path: '/',
  routes: [{
    path: '/home',
    name: 'home',
    component: home
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/personal',
    name: 'personal',
    component: personal
  }, {
    path: '/courseList',
    name: 'courseList',
    component: courseList
  }]
});

const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
console.log(historyCount);
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let token = store.state.token;
  store.commit('UPDATELOADINGSTATUS', {
    isLoading: true
  });

  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {
        direction: 'forward'
      });
    } else {
      store.commit('UPDATE_DIRECTION', {
        direction: 'reverse'
      });
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {
      direction: 'forward'
    });
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`;
  }
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next(); // 如果无需token,那么随它去吧
  }
});

router.afterEach((to) => {
  store.commit('UPDATELOADINGSTATUS', {
    isLoading: false
  });
});
export default router;
