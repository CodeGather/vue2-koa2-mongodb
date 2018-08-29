<template>
  <div id='foot_guide'>
    {{$route.name}}
      <tabbar>
        <tabbar-item :selected="$route.name.indexOf('home') >-1" link="/home">
          <img slot="icon" src="@/assets/tab/icon_nav_button.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name.indexOf('login')>-1" show-dot>
          <img slot="icon" src="@/assets/tab/icon_nav_msg.png">
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name.indexOf('courseList') >-1" link="/courseList">
          <img slot="icon" src="@/assets/tab/icon_nav_article.png">
          <span slot="label">课程</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name.indexOf('personal') > -1" badge="2" link="/personal">
          <img slot="icon" src="@/assets/tab/icon_nav_cell.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Hello World!',
      content: '',
      title:'',
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style lang="less">
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
