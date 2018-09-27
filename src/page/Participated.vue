<template>
  <div>
    <group gutte="5px" v-if="listData.length>1">
      <popup-picker :title="studentTitle" :data="listData" v-model="studentVal" :columns="1" ref="picker2" show-name @on-change="onChange"></popup-picker>
    </group>
    <section class="list-data">
      <ul>
        <li class="item" v-for="(item,index) in partiList" :key="index">
          <div>报名课程：<span>{{item.name}}</span></div>
          <div>报名时间：<span>{{item.createDate}}</span></div>
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
      isLoading: false
    }
  },
  mounted(){
    this.finData(()=>{
      this.onChange([this.listData[0].value])
    });
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
          this.partiList = particiList;
        }
      });
    }
  }
}
</script>

<style>
</style>
