<template>
  <div>
    <div class="head">
      <search :disabled="true" :auto-fixed="false"></search>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Search, XInput, XButton, Group, Cell } from 'vux'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'
import { setTimeout } from 'timers';

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
}
</style>
