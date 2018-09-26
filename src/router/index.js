import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import axios from '../config/axios';

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
  base: '/wechat/',
  scorllBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    meta: {
      title: '致英官网'
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
      title: '关联学生',
      requiresAuth: true
    },
    name: 'relation',
    component: relation
  }, {
    path: '/curriculum',
    meta: {
      title: '我的课表',
      requiresAuth: true
    },
    name: 'curriculum',
    component: curriculum
  }, {
    path: '/evaluate',
    meta: {
      title: '作业表现',
      requiresAuth: true
    },
    name: 'evaluate',
    component: evaluate
  }, {
    path: '/participated',
    meta: {
      title: '已参加课程',
      requiresAuth: true
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
    // 判断是否是新增页面
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {
        direction: 'forward'
      });
    } else { // 否则为后退就添加后退动画
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
    // 判断要去的路由有没有requiresAuth
    if (token) {
      next();
    } else {
      store.dispatch('UserLogin', true);
      window.location.href = axios.baseUrlData('http://topping.vip/wechat/personal')
        // this.shareUrl = window.location.href.split('#')[0];
        // next({
        //   path: '/login',
        //   query: {
        //     redirect: from.fullPath
        //   } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
        // });

      /*share(this.shareUrl).then(resolved => {
        console.log(resolved);
        Vue.wechat.config({
          debug: false,
          appId: resolved.data.appid,
          timestamp: resolved.data.timestamp,
          nonceStr: resolved.data.nonceStr,
          signature: resolved.data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      });

      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。  
      Vue.wechat.ready(function() {
        // 获取分享到朋友圈按钮点击状态及自定义分享内容接口  
        Vue.wechat.onMenuShareTimeline({
          title: '一直淘商城', // 分享标题    
          link: this.shareUrl,
          imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
          success: function(res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            alert("取消分享");
          }
        });

        // 获取分享给朋友按钮点击状态及自定义分享内容接口  
        Vue.wechat.onMenuShareAppMessage({
          title: '一直淘商城', // 分享标题  
          desc: this.goodsName, // 分享描述  
          link: this.shareUrl,
          imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
          type: 'link', // 分享类型,music、video或link，不填默认为link  
          success: function(res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            alert("取消分享");
          }
        });

        // 获取分享到QQ按钮点击状态及自定义分享内容接口  
        Vue.wechat.onMenuShareQQ({
          title: '一直淘商城', // 分享标题  
          desc: this.goodsName, // 分享描述  
          link: this.shareUrl, // 分享链接  
          imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
          success: function(res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            alert("取消分享");
          }
        });

        // 获取分享到腾讯微博按钮点击状态及自定义分享内容接口  
        Vue.wechat.onMenuShareWeibo({
          title: '一直淘商城', // 分享标题  
          desc: this.goodsName, // 分享描述  
          link: this.shareUrl, // 分享链接  
          imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
          success: function(res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            alert("取消分享");
          }
        });

        // 获取分享到QQ空间按钮点击状态及自定义分享内容接口  
        Vue.wechat.onMenuShareQZone({
          title: '一直淘商城', // 分享标题  
          desc: this.goodsName, // 分享描述  
          link: this.shareUrl, // 分享链接  
          imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
          success: function(res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            alert("取消分享");
          }
        });
      });*/
    }
  } else {
    next(); // 如果无需token,那么随它去吧
  }
});

router.afterEach((to) => {
  document.title = to.meta.title; // 修改页面标题
  setTimeout(() => { // 页面跳转完成后关闭loading框
    store.commit('UPDATELOADINGSTATUS', {
      isLoading: false
    });
  }, 300);
});
export default router;
