<template>
  <div>
    <x-header slot="header" :left-options="{showBack: false}">首页</x-header>
    <swiper :list="demo05_list" auto height="180px" @on-index-change="demo05_onIndexChange"></swiper>
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
import { XHeader, Group, Cell, Swiper } from 'vux'
import store from '../store'
import { loginByUsername } from '@/config/api'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Swiper
  },
  data () {
    return {
      msg: 'Hello World!',
      content: '',
      title:'',
      demo05_list:[{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
        title: '送你一次旅行',
        fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
      }],
      config: {
        width: '100%',
        height: '18px',
        background: 'rgb(194, 207, 214)',
        'background-image': 'linear-gradient(90deg,rgba(255, 255, 255, 0.15) 25%, transparent 25%)',
      }
    }
  },
  mounted(){
    this.$alert()
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
    },
    demo05_onIndexChange: ()=>{

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
