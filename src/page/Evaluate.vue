<template>
  <div>
    <group>
      <popup-picker :title="title2" :data="list2" v-model="value2" @on-change="findStudyCurriculum"></popup-picker>
    </group>
      
    <section class="list-data">
      <ul>
        <li class="item" v-for="(item,index) in listData" :key="index">
          <div>学习科目：<span>{{item.name}}</span></div>
          <div>学习时间：<span>{{item.time}}</span></div>
          <div>课堂表现：<span>{{item.desc}}</span></div>
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
      title2: '帅选条件',
      value2: ['数学', '2018-09'],
      list2: [['语文', '数学', '英语', '物理', '化学', '地理', '生物', '历史', '政治'], ['2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03']],
      listData: [{
        name: '数学',
        time: '2018-09-09 18:56',
        desc: '在某个领域是强项、但缺乏一点积极性',
      },{
        name: '物理',
        time: '2018-09-08 18:56',
        desc: '在某个领域是强项、但缺乏一点积极性',
      }],
      ruleForm: {
        userName: 'admin',
        password: '123456',
        checkPass: '',
      }
    }
  },
  mounted(){
    console.log(this.$store.state.isWechat())
    axios.findCurriculum({
      studentId: e[0]
    }).then(({ data }) => {
      this.isLoading = false;
      let particiList = data.data;
      if(particiList.length>0){
        this.partiList = particiList;
      }
    });
  },
  methods: {
    findStudyCurriculum(e){
      console.log(e)
      axios.findCurriculum(this.ruleForm).then(({ data }) => {
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

<style  lang="less">
</style>
