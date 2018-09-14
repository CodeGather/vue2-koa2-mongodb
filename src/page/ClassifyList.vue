<template>
  <div>
    <div class="head" @click="goSearch">
      <span class="mask"></span>
      <search :disabled="true" :auto-fixed="false"></search>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Search, XInput, XButton, Group, Cell } from 'vux'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'

export default {
  components: {
    XInput,
    Search,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      results: [],
      value: ''
    }
  },
  mounted(){
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    goSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less">
.head{
  position: relative;
  & .mask {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: transparent;
    z-index: 5;
  }
}
</style>
