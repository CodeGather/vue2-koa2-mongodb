import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const home = r => require.ensure([], () => r(require('@/page/Home')), 'home');
const login = r => require.ensure([], () => r(require('@/page/Login')), 'login');
const search = r => require.ensure([], () => r(require('@/page/Search')), 'search');
const classifyList = r => require.ensure([], () => r(require('@/page/ClassifyList')), 'classifyList');
const courseList = r => require.ensure([], () => r(require('@/page/CourseList')), 'courseList');
const personal = r => require.ensure([], () => r(require('@/page/Personal')), 'personal');
const relation = r => require.ensure([], () => r(require('@/page/Relation')), 'relation');
const evaluate = r => require.ensure([], () => r(require('@/page/Evaluate')), 'evaluate');
const curriculum = r => require.ensure([], () => r(require('@/page/Curriculum')), 'curriculum');
const participated = r => require.ensure([], () => r(require('@/page/Participated')), 'participated');

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    meta: {
      title: '首页'
    },
    name: 'home',
    component: home
  }, {
    path: '/login',
    meta: {
      title: '登录'
    },
    name: 'login',
    component: login
  }, {
    path: '/search',
    meta: {
      title: '搜索'
    },
    name: 'search',
    component: search
  }, {
    path: '/classifyList',
    meta: {
      title: '登录'
    },
    name: 'classifyList',
    component: classifyList
  }, {
    path: '/personal',
    meta: {
      title: '我的',
      requiresAuth: true
    },
    name: 'personal',
    component: personal
  }, {
    path: '/relation',
    meta: {
      title: '关联学生'
    },
    name: 'relation',
    component: relation
  }, {
    path: '/curriculum',
    meta: {
      title: '我的课表'
    },
    name: 'curriculum',
    component: curriculum
  }, {
    path: '/evaluate',
    meta: {
      title: '作业表现'
    },
    name: 'evaluate',
    component: evaluate
  }, {
    path: '/participated',
    meta: {
      title: '已参加课程'
    },
    name: 'participated',
    component: participated
  }, {
    path: '/courseList',
    meta: {
      title: '课程列表'
    },
    name: 'courseList',
    component: courseList
  }]
});

const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 设置loading状态为显示
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
  // 获取store里面的token
  let token = store.state.token;
  if (to.meta.requiresAuth) {
    console.log(to);
    // 判断要去的路由有没有requiresAuth
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
  document.title = to.meta.title;
  setTimeout(() => {
    store.commit('UPDATELOADINGSTATUS', {
      isLoading: false
    });
  }, 300);
});
export default router;
