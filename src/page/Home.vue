<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/login"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
import { loginByUsername } from '@/utils/api'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  mounted(){
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
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
