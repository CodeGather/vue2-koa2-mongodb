<template>
  <div style="height:100%">
    <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: $route.name !== 'home' &&  $route.name !== 'personal'}" v-if="isShowNav" :title="title"></x-header>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view" ></router-view>
      </transition>
      <!-- <foot-guide v-if="isShowBer"></foot-guide> -->
    </view-box>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import footGuide from '@/page/components/Footer'

export default {
  components: {
    footGuide
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      direction: state => state.direction,
    }),
    title () {    // 顶部导航标题
      return this.$route.meta.title
    },
    isShowNav(){  // 顶部导航
      if(this.$store.state.isWechat()){
        return true
      }
    },
    isShowBer(){  // 底部导航
      if(this.$route.name === 'courseList' ||  this.$route.name === 'personal'){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'http://at.alicdn.com/t/font_818955_n4x5auy4vpo.css';
// @import './assets/iconfont/iconfont.css';
html, body {
  height: 100%;
  width: 100%;
  // overflow: scroll;
  background-color: #fbf9fe;
}
li{
  list-style-type: none;
}
.list-data{
  padding: 10px 15px;
  & .item{
    border: 1px solid #ccc;
    border-radius:10px;
    padding: 10px;
    margin-bottom: 10px;
  }
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
