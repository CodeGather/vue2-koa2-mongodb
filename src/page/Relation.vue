<template>
  <div>
    <group label-width="4.2em" label-margin-right="1em" label-align="right">
      <x-input title="学生姓名" type="text" :is-type="nameValue" ref="refName" placeholder="必填" v-model="userForm.name"></x-input>
      <x-input title="学生学号" type="number" :is-type="numValue" ref="refNum" placeholder="必填" v-model="userForm.studentNumber"></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" :show-loading="isLoading" :disabled="isLoading" @click.native="submitBindStudent">关联</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'
import { getStore } from '@/config/utils'

export default {
  data () {
    return {
      isLoading: false,
      nameValue: function(value){ // 学生名字2~5
        return {
          valid: value.length > 1 && value.length < 6,
          msg: "学生姓名输入有误!"
        }
      },
      numValue: function(value){ // 学生学号4~11
        return {
          valid: value.length > 3 && value.length < 12,
          msg: "学生学号输入有误!"
        }
      },
      userForm: {
        name: '',
        studentNumber: '',
      }
    }
  },
  mounted(){
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    submitBindStudent() {
      if( !(this.userForm.name && this.userForm.studentNumber) ){ 
        return this.$toast({ text: '姓名或学号不能为空' })
      }
      if( !(this.$refs.refNum.valid && this.$refs.refName.valid) ){ 
        return this.$toast({ 
          text: this.$refs.refName.errors.format || this.$refs.refNum.errors.format 
        })
      }
      this.isLoading = true;
      axios.findStudent(this.userForm).then(({ data }) => {
        console.log(data)
        this.isLoading = false;
        if (data.msgCode===200) {
          this.$confirm({
            onConfirm: (e)=>{
              this.bindStudent()
            }
          })
          // this.$toast({
          //   text: data.msg
          // })
          // // 拿到返回的token和username，并存到store
          // this.$store.dispatch('UserLogin', this.ruleForm.userName);
          // // 跳到目标页
          // setTimeout(()=>{
          //   this.$router.push(this.$route.query.redirect);
          // },800)
        }
      });
    },
    bindStudent() {
      if( !this.userForm.userNum ){ 
        return this.$toast({ text: '学号不能为空' })
      }
      if( !this.$refs.refNum.valid ){ 
        return this.$toast({ 
          text: this.$refs.refNum.errors.format 
        })
      }
      this.isLoading = true;
      this.$confirm({
        onConfirm: (e)=>{
          console.log(e)
        }
      })
      axios.bindStudent({
        openId: getStore('openid'),
        studentId: this.userForm.userNum
      }).then(({ data }) => {
        console.log(data)
        this.isLoading = false;
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
