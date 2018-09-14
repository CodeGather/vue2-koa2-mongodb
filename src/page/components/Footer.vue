<template>
  <div id='foot_guide'>
      <tabbar slot="footer">
        <tabbar-item icon-class="iconfont icon-shouye" :selected="$route.name.indexOf('home') > -1" link="/home">
          <span slot="icon" icon-class='iconfont icon-gerenzhongxin'></span>
          <span slot="label">首页</span>
        </tabbar-item>
        <!-- <tabbar-item link="/login">
          <img slot="icon" src="@/assets/tab/icon_nav_msg.png">
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item link="/classifyList">
          <span slot="icon" icon-class='iconfont icon-gerenzhongxin'></span>
          <span slot="label">分类</span>
        </tabbar-item> -->
        <tabbar-item icon-class="iconfont icon-gerenzhongxin" :selected="$route.name.indexOf('personal') > -1" link="/personal">
          <span slot="icon" icon-class='iconfont icon-gerenzhongxin'></span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style lang="less" scoped> 
  html, body {
    height: 100%;
    width: 100%;
    background-color: #fbf9fe;
  }
  #foot_guide{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
