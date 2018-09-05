<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view" ></router-view>
    </transition>
    <!-- <foot-guide v-if="$route.name === 'home' || $route.name === 'courseList' ||  $route.name === 'personal'"></foot-guide> -->
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
import footGuide from '@/page/components/Footer'

export default {
  name: 'app',
  components: {
    Loading,
    footGuide
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      direction: state => state.direction,
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'http://at.alicdn.com/t/font_818955_n4x5auy4vpo.css';
// @import './assets/iconfont/iconfont.css';
@header-background-color:#e0793e;
html, body {
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: #fbf9fe;
}
.weui-btn_primary{
  background-color: @header-background-color!important;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  width: 100%;
  top: 0;
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
