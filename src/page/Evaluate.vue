<template>
  <div>
    <!-- <group>
      <popup-picker :title="title2" :data="list2" v-model="value2" @on-change="findStudyCurriculum"></popup-picker>
    </group> -->
    
    <group gutte="5px" v-if="listData.length>1">
      <popup-picker :title="studentTitle" :data="listData" v-model="studentVal" :columns="1" ref="picker2" show-name @on-change="onChange"></popup-picker>
    </group>
    <section class="list-data">
      <ul>
        <li class="item" v-for="(item,index) in partiData" :key="index">
          <div>学习科目：{{item.name}}</div>
          <div>课堂表现：{{item.remarks||'暂无'}}</div>
          <div>学习时间：{{item.createDate}}</div>
          <div>课堂表现：{{item.remarks||'暂无'}}</div>
        </li>
        <li><load-more :show-loading="isLoading" :tip="isLoading?'正在加载中':'暂无数据'" background-color="#fbf9fe"></load-more></li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '@/config/axios'
import { getStore } from '@/config/utils'

export default {
  data () {
    return {
      studentTitle: '选择学生',
      studentVal: [],
      partiList: [],
      listData: [],
      isLoading: false,
      title2: '帅选条件',
      value2: ['数学', '2018-09'],
      list2: [['语文', '数学', '英语', '物理', '化学', '地理', '生物', '历史', '政治'], ['2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03']],
      partiData: [],
      ruleForm: {
        userName: 'admin',
        password: '123456',
        checkPass: '',
      }
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.finData(()=>{
        this.onChange([this.listData[0].value])
      });
    })
  },
  methods: {
    finData(fn){
      axios.findBindStudent({
        wechatId: getStore('id')
      }).then(( e ) => {
        let bindStudentData = e.data.data;
        if( bindStudentData.length > 0 ){
          bindStudentData.forEach(ele => {
            this.listData.push({
              name:ele.name,
              value:ele.id
            })
          });
          fn && fn()
        }
      });
    },
    onChange(e){
      this.isLoading = true;
      axios.findCurriculum({
        studentId: e[0]
      }).then(({ data }) => {
        this.isLoading = false;
        let particiList = data.data;
        if(particiList){
          this.$set(this, 'partiData', particiList)
        }
      });
    },
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
    }
  }
}
</script>

<style  lang="less">
</style>
