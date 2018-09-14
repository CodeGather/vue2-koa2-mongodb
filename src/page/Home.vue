<template>
  <div style="height:100%">
      <swiper :list="ad_list" auto height="180px" @on-index-change="ad_onIndexChange"></swiper>
      <box gap="10px 10px 80px">
        <div class="title">致英教育</div>
        <divider>打造专业个性化教育品牌</divider>
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/2"><div class="feature">特色一</div></flexbox-item>
          <flexbox-item :span="1/2"><div class="feature">特色二</div></flexbox-item>
          <flexbox-item :span="1/2"><div class="feature">特色三</div></flexbox-item>
          <flexbox-item :span="1/2"><div class="feature">特色四</div></flexbox-item>
        </flexbox>
        <div class="title">我们的课程</div>
        <divider>全方位个性定制</divider>
        <flexbox :gutter="10" wrap="wrap">
          <flexbox-item>
            <div class="feature">
              <x-img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg"></x-img>
              <div>毕业班高校冲刺</div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="feature">
              <x-img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"></x-img>
              <div>非毕业班互动提升</div>
            </div>
          </flexbox-item>
        </flexbox>
        <div class="title">致英专属导师</div>
        <divider>严格的选拔和培养体系</divider>
        <flexbox orient="vertical">
          <flexbox-item>
            <div class="feature tutor">
              <x-img src="https://o5omsejde.qnssl.com/demo/test8.jpg"></x-img>
            </div>
          </flexbox-item>
          <flexbox-item class="item"><div class="feature">特技一</div></flexbox-item>
          <flexbox-item class="item"><div class="feature">特技二</div></flexbox-item>
          <flexbox-item class="item"><div class="feature">特技三</div></flexbox-item>
          <flexbox-item class="item"><div class="feature">特技四</div><div class="feature-foot">特技四</div></flexbox-item>
        </flexbox>
      </box>
      <box class="foot-flex">
        <x-button type="primary" @click.native="handLogin">电话咨询</x-button>
      </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Flexbox, FlexboxItem, Swiper, Divider, XImg, Box, XButton, ViewBox } from 'vux'
import { loginByUsername } from '@/config/api'

export default {
  components: {
    Flexbox, 
    FlexboxItem,
    Swiper,
    Divider,
    XImg,
    Box, 
    XButton,
    ViewBox 
  },
  data () {
    return {
      ad_list:[{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
        title: '送你一次旅行',
        fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
      }]
    }
  },
  mounted(){
    let url = 'http://127.0.0.1:8081/api/v1/userSignIn';
    fetch(url).then((result) => {
      setTimeout(()=>{
        this.$store.dispatch('UserName', result.url);
      },2000)
    })
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    ...mapActions(['Login']),
    ad_onIndexChange: (e)=>{
      console.log(e)
    }
  }
}
</script>

<style lang="less">
html, body {
  height: 100%;
  width: 100%;
  background-color: #fbf9fe;
}
.title{
  text-align: center;
  margin-top: 25px;
  color: #e0793e;
  font-weight: bold;
}
.vux-divider{
  margin-bottom: 25px;
}
.item{
  position: relative;
  border: 1px solid #ccc;
}
.feature{
  text-align: center;
}
.tutor img{
  height: 210px;
  width: 100%;
}
.feature-foot{
  position: absolute;
  top: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px solid red;
  transform: rotateX(30deg)
}
.foot-flex{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
}
</style>
