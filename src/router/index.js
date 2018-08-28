import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/page/Home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/Login')), 'login')
const courseList = r => require.ensure([], () => r(require('@/page/CourseList')), 'courseList')
const personal = r => require.ensure([], () => r(require('@/page/Personal')), 'personal')

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
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

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let token = store.state.token;
  store.commit('UPDATELOADINGSTATUS', {
    isLoading: true
  })

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
  })
})
export default router;
