<template>
  <div style="height:100%">
    <x-header slot="header" :left-options="{showBack: false}">我的</x-header>
    <flexbox>
      <flexbox-item class="user-img" :span="4">
        <img src="@/assets/vux_logo.png">
      </flexbox-item>
      <flexbox-item>
        <div>王某某</div>
      </flexbox-item>
    </flexbox>
    <group>
      <cell is-link title="关联学生" :is-loading="!studentName" :value="studentName" link="/relation">
        <span slot="icon" class="iconfont icon-guanlian" style="margin-right:5px;"></span>
      </cell>
      <cell is-link title="我的课表" link="/curriculum">
        <span slot="icon" class="iconfont icon-kecheng" style="margin-right:5px;"></span>
      </cell>
      <cell is-link title="作业表现" link="/evaluate">
        <span slot="icon" class="iconfont icon-zuoye" style="margin-right:5px;"></span>
      </cell>
      <cell is-link title="已参加课程" link="/participated">
        <span slot="icon" class="iconfont icon-kecheng2" style="margin-right:5px;"></span>
      </cell>
    </group>
    <!-- <div v-occupy="{ data: content, config }"></div> -->
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { XHeader, Group, Cell, Flexbox, FlexboxItem } from 'vux'
import store from '../store'
import { loginByUsername } from '@/config/api'
import footGuide from './components/Footer.vue'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Flexbox, 
    FlexboxItem,
    footGuide
  },
  data () {
    return {
      msg: 'Hello World!',
      content: '',
      title:'',
      studentName: '',
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
        this.studentName = '王某某'
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
  .user-img{
    padding: 20px 15px 0;
    box-sizing: border-box;
    & img{
      width: 100%;
    }
  }
</style>
