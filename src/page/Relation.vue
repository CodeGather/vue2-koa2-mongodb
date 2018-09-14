<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="账号" type="text"  placeholder="必填" v-model="userName"></x-input>
      <x-input title="密码" type="password" placeholder="必填" v-model="passWord"></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" :show-loading="isLoading" :disabled="isLoading" @click.native="handLogin">关联</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { XInput, XButton, Group, Cell, Box } from 'vux'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'
import { setTimeout } from 'timers';

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Box
  },
  data () {
    return {
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
      if( !(this.userName && this.passWord) ){ return this.$toast({ text: '姓名或学号不能为空' })}
      this.isLoading = true;
      this.$confirm()
      axios.userSignIn(this.ruleForm).then(({ data }) => {
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
      });
    }
  }
}
</script>

<style>
</style>
