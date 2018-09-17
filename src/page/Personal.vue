<template>
  <div style="height:100%">
    <flexbox>
      <flexbox-item class="user-img" :span="4">
        <img v-initi="{ data: src, config: {width: '100px',height: '100px',borderRadius: '50%'}}">
      </flexbox-item>
      <flexbox-item>
        <div v-initi="{ data: content, config: {width: '80%',height: '24px',overflow: 'hidden', textOverflow: 'ellipsis'}}"></div>
      </flexbox-item>
    </flexbox>
    <group>
      <cell is-link title="关联学生" :is-loading="!studentName" :value="studentName" link="/relation">
        <span slot="icon" class="iconfont icon-guanlian" style="margin-right:5px;"></span>
      </cell>
      <!-- <cell is-link title="我的课表" link="/curriculum">
        <span slot="icon" class="iconfont icon-kecheng" style="margin-right:5px;"></span>
      </cell> -->
      <cell is-link title="作业表现" link="/evaluate">
        <span slot="icon" class="iconfont icon-zuoye" style="margin-right:5px;"></span>
      </cell>
      <cell is-link title="已参加课程" link="/participated">
      
        <span slot="icon" class="iconfont icon-kecheng2" style="margin-right:5px;"></span>
      </cell>
    </group>
    <box gap="20px 15px">
      <x-button type="primary" :show-loading="isLoading" @click.native="loginIn">登录</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '@/config/axios'

export default {
  data () {
    return {
      isLoading: false,
      content: '',
      title:'',
      src:'',
      studentName: ''
    }
  },
  mounted(){
    // let url = 'http://127.0.0.1:8081/api/v1/userSignIn';
    // fetch(url).then((result) => {
    //   setTimeout(()=>{
    //     this.$store.dispatch('UserName', result.url);
    //     this.title = result.url
    //     this.content = result.url
    //     this.studentName = '王某某'
    //     this.src = 'https://www.baidu.com/img/baidu_jgylogo3.gif'
    //   },2000)
    // })
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
    let urlData = this.$route.query;
    if(urlData.code && urlData.state){
      axios.userSignIn({
        code: urlData.code,
        state: urlData.state
      }).then(({ data }) => {
        console.log(data)
      });
    }
  },
  methods: {
    ...mapActions(['Login']),
    async loginIn(data) {
      window.location.href = 'http://topping.mydrn.cn/zhiying/public/wechat/oauth2.do?redirectUrl=http://topping.mydrn.cn/home'
      // this.loading = true;
      // axios.userSignIn({userName:'admin'}).then(({ data }) => {
      //   // console.log(data)
      //   if (data.msgCode===200) {
      //     this.$toast({
      //       text: data.msg
      //     })
      //     this.$store.dispatch('UserLogout');
      //     setTimeout(()=>{
      //       this.$router.push({ path: '/home' });
      //     },1000)
      //   }
      // });
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
