<template>
  <div>
    <group>
      <popup-picker :title="title2" :data="list2" v-model="value2"></popup-picker>
    </group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Group, Cell, PopupPicker } from 'vux'
// import { loginByUsername } from '@/utils/api'
import axios from '@/config/axios'

export default {
  components: {
    Group,
    Cell,
    PopupPicker
  },
  data () {
    return {
      title2: '帅选条件',
      value2: ['数学', '2018-09'],
      list2: [['语文', '数学', '英语', '物理', '化学', '地理', '生物', '历史', '政治'], ['2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03']],
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
