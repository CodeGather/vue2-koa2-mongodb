<template>
  <div style="height:100%">
      <swiper :list="ad_list" auto height="180px" @on-index-change="ad_onIndexChange"></swiper>
      <box gap="10px 10px 80px">
        <div class="title">致英教育</div>
        <divider>打造专业个性化教育品牌</divider>
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item class="feature_item" :span="1/2"><div class="feature">见效快</div></flexbox-item>
          <flexbox-item class="feature_item" :span="1/2"><div class="feature">方法好</div></flexbox-item>
          <flexbox-item class="feature_item" :span="1/2"><div class="feature">效率高</div></flexbox-item>
          <flexbox-item class="feature_item" :span="1/2">
            <div class="feature">权威性强</div>
          </flexbox-item>
        </flexbox>
        <div class="title">我们的课程</div>
        <divider>全方位个性定制</divider>
        <flexbox :gutter="10" wrap="wrap">
          <flexbox-item>
            <div class="feature bord_radius">
              <x-img :offset="20" class="course_img" :src="imgURL1"></x-img>
              <box gap="10px">
                <div class="course_body_head">毕业班高校冲刺</div>
                <div class="course_body_desc">如果你无法简洁的表达你的想法，那只说明你还不够了解他。</div>
                <div class="course_body_foot">--阿尔伯特●爱因斯坦</div>
              </box>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="feature bord_radius">
              <x-img :offset="20" class="course_img" :src="imgURL1"></x-img>
              <box gap="10px">
                <div class="course_body_head">非毕业班互动提升</div>
                <div class="course_body_desc">如果你无法简洁的表达你的想法，那只说明你还不够了解他。</div>
                <div class="course_body_foot">--阿尔伯特●爱因斯坦</div>
              </box>
            </div>
          </flexbox-item>
        </flexbox>
        <div class="title">致英专属导师</div>
        <divider>严格的选拔和培养体系</divider>
        <div class="tutor_item bord_radius">
          <div>
            <div class="feature tutor_img">
              <x-img :offset="20" :src="imgURL1"></x-img>
            </div>
          </div>
          <div class="item">
            <div class="feature">
              教师个人简介：教授的过程实际上就是‘接触-挖掘-领会-创造‘的过程。应该不断探索灵活、高效的学方法，联系生活，深入浅出，让学生自觉地自发地去体会。当然一把钥匙开一把锁 ，不同的学生有不同的教学方法.从教以来，孜孜不倦地追求教学艺术，深受学生喜爱、家长信任.
            </div>
          </div>
        </div>
        <div class="tutor_item bord_radius">
          <div>
            <div class="feature tutor_img">
              <x-img :offset="20" :src="imgURL1"></x-img>
            </div>
          </div>
          <div class="item">
            <div class="feature">
              能受到学生的尊敬和欢迎，这是教师的价值所在.学习不仅仅是课本教材，最重要的是社会这本无字课本。我能做到的是把每个孩子当作我自己的孩子，用耐心‘恒心 ‘细心 三心级教师为孩子们服务.让孩子们来了就会有收获.
            </div>
          </div>
        </div>
        <div class="tutor_item bord_radius">
          <div>
            <div class="feature tutor_img">
              <x-img :offset="20" :src="imgURL1"></x-img>
            </div>
          </div>
          <div class="item">
            <div class="feature">
              英语教师个人心得：学英语就像建高楼大厦，语法是基本骨架，而单词是一块块砖头（Learning English is like building tall buildings. Grammar is the basic framework and words are bricks.）
            </div>
          </div>
        </div>
      </box>
      <box class="foot-flex">
        <x-button type="primary" @click.native="handLogin">电话咨询</x-button>
      </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { loginByUsername } from '@/config/api'

export default {
  data () {
    return {
      imgURL1: require('../assets/1.jpg'),
      imgURL2: require('../assets/2.jpg'),
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
@ccc:#ccc;
html, body {
  height: 100%;
  width: 100%;
  background-color: #fbf9fe;
}
.bord_radius{
  border: 1px solid @ccc;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.title{
  text-align: center;
  margin-top: 25px;
  color: @theme-color;
  font-weight: bold;
}
.vux-divider{
  margin-bottom: 20px;
}
.feature_item{
  padding: 10px 20px;
  box-sizing: border-box;
  & .feature{
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 5px solid @theme-color;
  }
}
.feature{
  & .course_img{
    width: 100%;
    height: 120px;
    vertical-align: middle;
  }
  & .course_body_head{
    text-align: center;
  }
  & .course_body_desc{
    text-indent:25px;
    text-align: justify;
    margin-top: 10px
  }
  & .course_body_foot{
    font-size: 0.3em;
    text-align: right;
    color: @ccc;
    margin-top: 10px
  }
}
.tutor_item{
  margin-bottom: 20px;
  & .tutor_img img{
    height: 180px;
    width: 100%;
    vertical-align: middle;
  }
  & .item{
    padding: 10px;
    box-sizing: border-box;
    text-align: justify;
  }
}
.foot-flex{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
}
</style>
