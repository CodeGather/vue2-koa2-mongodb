<template>
  <div>
    <div class="vux-demo" @click="handLogin">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="账号" type="text"  placeholder="必填" v-model="userName"></x-input>
      <x-input title="密码" type="password" placeholder="必填" v-model="passWord"></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" :show-loading="isLoading" @click.native="handLogin">登录</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'

export default {
  data () {
    return {
      msg: 'Hello World!',
      userName: '',
      passWord: '',
      isLoading: false,
      ruleForm: {
        userName: 'admin',
        password: '123456',
      }
    }
  },
  mounted(){
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    handLogin() {
      this.isLoading = true;
      // 拿到返回的token和username，并存到store
      this.$store.dispatch('UserLogin', this.ruleForm.userName);
      // 跳到目标页
      setTimeout(()=>{
        this.$router.push(this.$route.query.redirect);
      },800)
      /*axios.userSignUp(this.ruleForm).then(({ data }) => {
        console.log(data)
        if (data.msgCode===200) {
          this.$toast({
            text: data.msg
          })
          // 拿到返回的token和username，并存到store
          this.$store.dispatch('UserLogin', this.ruleForm.userName);
          // 跳到目标页
          setTimeout(()=>{
            this.$router.push(this.$route.query.redirect);
          },800)
        }
      });*/
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
