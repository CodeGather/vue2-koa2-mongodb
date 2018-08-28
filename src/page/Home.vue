<template>
  <div style="height:100%">
    <view-box>
      <x-header slot="header" :left-options="{showBack: false}">首页</x-header>
      <group>
        <cell is-link title="Simple" link="/login"></cell>
        <cell is-link :title="title" link="/component/tabbar-icon"></cell>
      </group>
      <div v-occupy="{ data: content, config }"></div>
      <div v-occupy="{ data: content, config }"></div>
      <div v-occupy="{ data: content, config }"></div>
      <div v-occupy="{ data: content, config }"></div>
      <router-view></router-view>
      <tabbar>
        <tabbar-item>
          <img slot="icon" src="../assets/tab/icon_nav_button.png">
          <span slot="label">Wechat</span>
        </tabbar-item>
        <tabbar-item show-dot>
          <img slot="icon" src="../assets/tab/icon_nav_msg.png">
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item selected link="/component/demo">
          <img slot="icon" src="../assets/tab/icon_nav_article.png">
          <span slot="label">Explore</span>
        </tabbar-item>
        <tabbar-item badge="2">
          <img slot="icon" src="../assets/tab/icon_nav_cell.png">
          <span slot="label">News</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'
import { XHeader, Tabbar, TabbarItem, Group, Cell, ViewBox } from 'vux'
import { loginByUsername } from '@/utils/api'

export default {
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    ViewBox
  },
  data () {
    return {
      msg: 'Hello World!',
      content: '',
      title:'',
      config: {
        width: '100%',
        height: '18px',
        background: 'rgb(194, 207, 214)',
        'background-image': 'linear-gradient(90deg,rgba(255, 255, 255, 0.15) 25%, transparent 25%)',
      }
    }
  },
  mounted(){
    let url = 'http://127.0.0.1:8081/api/v1/userSignIn';
    fetch(url).then((result) => {
      console.log(result)
      setTimeout(()=>{
        this.$store.dispatch('UserName', result.url);
        this.title = result.url
        this.content = result.url
      },2000)
    })
    console.log(store.state.token)
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    ...mapActions(['Login']),
    async handLogin() {
      this.loading = true;
      const res = await loginByUsername(1313, 165262302);
      this.Login(res.data);

      this.$router.push({ path: '/login' });
    }
  }
}
</script>

<style lang="less">
html, body {
  height: 100%;
  width: 100%;
  background-color: #fbf9fe;
}
</style>
