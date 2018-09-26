<template>
  <div style="height:100%">
    <flexbox>
      <flexbox-item class="user-img" :span="4">
        <img v-initi="{ data: src, config: {width: '100px',height: '100px',borderRadius: '50%'}}">
      </flexbox-item>
      <flexbox-item>
        <div v-initi="{ data: nickname, config: {width: '80%',height: '24px',overflow: 'hidden', textOverflow: 'ellipsis'}}"></div>
      </flexbox-item>
    </flexbox>
    <group>
      <cell is-link title="关联学生" :is-loading="!studentName" :value="studentName" link="/relation">
        <span slot="icon" class="iconfont icon-guanlian" style="margin-right:5px;"></span>
      </cell>
      <!-- <cell is-link title="我的课表" link="/curriculum">
        <span slot="icon" class="iconfont icon-kecheng" style="margin-right:5px;"></span>
      </cell>
      <cell is-link title="作业表现" link="/evaluate">
        <span slot="icon" class="iconfont icon-zuoye" style="margin-right:5px;"></span>
      </cell> -->
      <cell is-link title="已参加课程" link="/participated">
      
        <span slot="icon" class="iconfont icon-kecheng2" style="margin-right:5px;"></span>
      </cell>
    </group>
    <box gap="20px 15px">
      <x-button type="primary" :show-loading="isLoading" @click.native="loginIn" v-if="!this.$store.state.token">登录</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '@/config/axios'
import { getStore } from '@/config/utils'

export default {
  data () {
    return {
      isLoading: false,
      nickname: '',
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
    // let urlData = this.$route.query;
    // alert(JSON.stringify(urlData))
    // if(urlData.code && urlData.state){
    //   }
    axios.findData({}).then(( data ) => {
      let userData = data.data.data;
      if(userData.hasOwnProperty('nickname')){
        this.src = userData.headImgUrl;
        this.nickname = userData.nickname
        this.$store.dispatch('UserName', userData);
        axios.findBindStudent({
          wechatId: getStore('id')
        }).then(( e ) => {
          let bindStudentData = e.data.data;
          if(bindStudentData.length>0){
            let userName = '';
            if(bindStudentData.length===1){
              userName = bindStudentData[0].name
            }else{
              userName = ''+bindStudentData.length
            }
            this.studentName = userName;
          }else{
            this.studentName = ' '
          }
        });
      }
    }).catch((e)=>{
      console.log(e)
    });
    // this.setCookie('name',-1)
    // console.log(this.$route)
  },
  methods: {
    ...mapActions(['Login']),
    async loginIn(data) {
      if(this.$store.state.token){
        this.src = '';
        this.nickname = '';
        this.$store.dispatch('UserLogout');
      }else{
        this.$store.dispatch('UserLogin', true);
        window.location.href = axios.baseUrlData(window.location.href)
      }
    },
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
      console.info(document.cookie);
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
      overflow: hidden;
    }
  }
</style>
