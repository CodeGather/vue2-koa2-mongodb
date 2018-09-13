<template>
  <div>
    <x-header slot="header" v-if="this.$store.state.isWechat()">已参加课程</x-header>
    <group title="double columns">
      <popup-picker :title="title2" :data="list2" v-model="value2"></popup-picker>
    </group>
    {{this.$store.state.isWechat()}}
    <section>
      <ul>
        <li class="item">
          <div>学习科目：<span>数学</span></div>
          <div>学习时间：<span>2018-09-06 18:00</span></div>
          <div>课堂表现：<span>在某个领域是强项、但缺乏一点积极性</span></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { XHeader, Group, Cell, PopupPicker } from 'vux'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    PopupPicker
  },
  data () {
    return {
      title2: '详细机型',
      value2: ['iPhone', '华为3'],
      list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
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
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
