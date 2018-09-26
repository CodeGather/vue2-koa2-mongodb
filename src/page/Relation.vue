<template>
  <div>
    <section class="list-data" v-if="!relationAdd && userListData.length>0">
      <ul>
        <li class="item" v-for="(item,index) in userListData" :key="index">
          <div>学生姓名：<span>{{item.name}}</span></div>
          <div>学生学号：<span>{{item.studentNumber}}</span></div>
        </li>
        <li><load-more v-if="userListData.length===0" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more></li>
      </ul>
      <box gap="10px 0">
        <x-button type="primary" @click.native="relationAdd=!relationAdd">继续添加</x-button>
      </box>
    </section>
    <section v-if="relationAdd || userListData.length===0">
      <group label-width="4.2em" label-margin-right="1em" label-align="right">
        <x-input title="学生姓名" type="text" :is-type="nameValue" ref="refName" placeholder="必填" v-model="name"></x-input>
        <x-input title="学生学号" type="number" :is-type="numValue" ref="refNum" placeholder="必填" v-model="studentNumber"></x-input>
      </group>
      <box gap="10px 10px">
        <x-button type="primary" :show-loading="isLoading" :disabled="isLoading" @click.native="submitBindStudent">关联</x-button>
      </box>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'
import { getStore } from '@/config/utils'
import { setTimeout } from 'timers';

export default {
  data () {
    return {
      swithchShow: true,
      relationAdd: false,
      isLoading: false,
      userListData: [],
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
      name: '',
      studentNumber: '',
    }
  },
  mounted(){
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
    this.finData();
  },
  methods: {
    finData(){
      axios.findBindStudent({
        wechatId: getStore('id')
      }).then(( e ) => {
        let bindStudentData = e.data.data;
        if( bindStudentData.length > 0 ){
          this.userListData = bindStudentData
        }
      });
    },
    switchOpen(){
      this.finData();
      this.relationAdd = !this.relationAdd
    },
    submitBindStudent() {
      if( this.name =='' || this.studentNumber =='' ){ 
        return this.$toast({ text: '姓名或学号不能为空' })
      }
      if( !(this.$refs.refNum.valid && this.$refs.refName.valid) ){ 
        return this.$toast({ 
          text: this.$refs.refName.errors.format || this.$refs.refNum.errors.format 
        })
      }
      this.isLoading = true;
      axios.findStudent({
        name:this.name,
        studentNumber: this.studentNumber
      }).then(({ data }) => {
        this.isLoading = false;
        if (data.data.length===1) {
          this.$confirm({
            title: '温馨提示',
            content: '请您确定以下绑定信息<br/>绑定姓名：'+data.data[0].name+'<br/>绑定学号：'+data.data[0].studentNumber,
            onConfirm: (e)=>{
              this.bindStudent(data.data[0].id)
            }
          })
        }else{
          this.$toast({ 
            text: '请核对信息、重新提交' 
          })
        }
      });
    },
    bindStudent(e) {
      axios.bindStudent({
        openId: getStore('openid'),
        studentId: e
      }).then(({ data }) => {
        this.isLoading = false;
        let tipText = '';
        if(data.responeCode==0){
          tipText = '恭喜绑定成功';
          setTimeout(()=>{
            this.switchOpen();
          },1000)
        }else if(data.responeCode=='-1'){
          tipText = data.responeMsg
        }else{
          tipText = '绑定失败！'
        }
        this.$toast({ 
          text: tipText
        })
      });
    }
  }
}
</script>

<style>
</style>
