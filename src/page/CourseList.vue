<template>
  <div style="height:100%">
    <group>
      <cell is-link title="Simple" link="/login"></cell>
      <cell is-link :title="title" link="/component/tabbar-icon"></cell>
    </group>
    <div v-occupy="{ data: content, config }"></div>
    <div v-occupy="{ data: content, config }"></div>
    <div v-occupy="{ data: content, config }"></div>
    <div v-occupy="{ data: content, config }"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Group, Cell } from 'vux'
import store from '../store'
import { loginByUsername } from '@/config/api'

export default {
  components: {
    Group,
    Cell,
    footGuide
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
