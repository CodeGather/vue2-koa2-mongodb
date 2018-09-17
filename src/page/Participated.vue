<template>
  <div>
    <section class="list-data">
      <ul>
        <li class="item" v-for="(item,index) in listData" :key="index">
          <div>报名课程：<span>{{item.name}}</span></div>
          <div>报名时间：<span>{{item.time}}</span></div>
        </li>
        <li><load-more v-if="listData.length===0" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more></li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'

export default {
  data () {
    return {
      listData: [],
      ruleForm: {
        userName: 'admin',
        password: '123456',
        checkPass: '',
      }
    }
  },
  mounted(){
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
    console.log(this.$store.state.isWechat())
    setTimeout(()=>{
      this.listData = [{
        name: '数学',
        time: '2018-09-08',
      },{
        name: '语文',
        time: '2018-09-08',
      }]
    },1000)
    axios.findCurriculum({
      studentId: '16516'
    }).then(({ data }) => {
      // 账号不存在
      if (data.info === false) {
        this.$message({
          type: 'info',
          message: '账号不存在'
        });
        return;
      }
      if (data.success) {
        this.$message({
          type: 'success',
          message: '登录成功'
        });
        // 拿到返回的token和username，并存到store
        let token = data.token;
        let username = data.username;
        this.$store.dispatch('UserLogin', token);
        this.$store.dispatch('UserName', username);
        // 跳到目标页
        this.$router.push('HelloWorld');
      }
    });
  },
  methods: {
    handLogin() {
      axios.userSignIn(this.ruleForm).then(({ data }) => {
        // 账号不存在
        if (data.info === false) {
          this.$message({
            type: 'info',
            message: '账号不存在'
          });
          return;
        }
        if (data.success) {
          this.$message({
            type: 'success',
            message: '登录成功'
          });
          // 拿到返回的token和username，并存到store
          let token = data.token;
          let username = data.username;
          this.$store.dispatch('UserLogin', token);
          this.$store.dispatch('UserName', username);
          // 跳到目标页
          this.$router.push('HelloWorld');
        }
      });
    }
  }
}
</script>

<style>
</style>
