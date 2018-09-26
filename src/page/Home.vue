<template>
  <div style="height:100%">
      <swiper :list="ad_list" auto :height="height" @on-index-change="ad_onIndexChange"></swiper>
      <box gap="10px 10px 80px">
        <section>
          <div class="title">致英教育</div>
          <divider>打造专业个性化教育品牌</divider>
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item class="feature_item" :span="1/2"><div class="feature">见效快</div></flexbox-item>
            <flexbox-item class="feature_item" :span="1/2"><div class="feature">方法好</div></flexbox-item>
            <flexbox-item class="feature_item" :span="1/2"><div class="feature">效率高</div></flexbox-item>
            <flexbox-item class="feature_item" :span="1/2"><div class="feature">权威性强</div></flexbox-item>
          </flexbox>
        </section>
        <section>
          <div class="title">我们的课程</div>
          <divider>全方位个性定制</divider>
          <flexbox :gutter="10" wrap="wrap">
            <flexbox-item>
              <div class="feature bord_radius">
                <x-img :offset="-100" :src="aboutImg" :default-src="aboutImg"></x-img>
                <box gap="10px">
                  <div class="course_body_head">毕业班高校冲刺</div>
                  <div class="course_body_desc">如果你无法简洁的表达你的想法，那只说明你还不够了解他。</div>
                  <div class="course_body_foot">--阿尔伯特●爱因斯坦</div>
                </box>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="feature bord_radius">
                <x-img :offset="-100" :src="aboutImg" :default-src="aboutImg"></x-img>
                <box gap="10px">
                  <div class="course_body_head">非毕业班互动提升</div>
                  <div class="course_body_desc">如果你无法简洁的表达你的想法，那只说明你还不够了解他。</div>
                  <div class="course_body_foot">--阿尔伯特●爱因斯坦</div>
                </box>
              </div>
            </flexbox-item>
          </flexbox>
        </section>
        <section>
          <div class="title">教师简介</div>
          <div class="tutor_item bord_radius">
            <div class="item">
              教授的过程实际上就是“接触-挖掘-领会-创造”的过程。应该不断探索灵活、高效的学方法，联系生活，深入浅出，让学生自觉地自发地去体会。一把钥匙开一把锁 ，不同的学生有不同的教学方法。我们从教以来，一直孜孜不倦地追求教学艺术。
            </div>
          </div>
        </section>
        <section>
          <div class="title">致英专属导师</div>
          <divider>严格的选拔和培养体系</divider>
          <div class="tutor_item bord_radius">
            <div class="tutor_img">
              <x-img :offset="-100" :src="imgURL1" :height="height" :default-src="imgURL1"></x-img>
            </div>
            <div class="item">
              教师个人简介：教授的过程实际上就是‘接触-挖掘-领会-创造‘的过程。应该不断探索灵活、高效的学方法，联系生活，深入浅出，让学生自觉地自发地去体会。当然一把钥匙开一把锁 ，不同的学生有不同的教学方法.从教以来，孜孜不倦地追求教学艺术，深受学生喜爱、家长信任.
            </div>
          </div>
          <div class="tutor_item bord_radius">
            <div class="tutor_img">
              <x-img :offset="-100" :src="aboutImg" :height="height" :default-src="aboutImg"></x-img>
            </div>
            <div class="item">
              能受到学生的尊敬和欢迎，这是教师的价值所在.学习不仅仅是课本教材，最重要的是社会这本无字课本。我能做到的是把每个孩子当作我自己的孩子，用耐心‘恒心 ‘细心 三心级教师为孩子们服务.让孩子们来了就会有收获.
            </div>
          </div>
          <div class="tutor_item bord_radius">
            <div class="tutor_img">
              <x-img :offset="-100" :src="aboutImg" :height="height" :default-src="aboutImg"></x-img>
            </div>
            <div class="item">
              英语教师个人心得：学英语就像建高楼大厦，语法是基本骨架，而单词是一块块砖头（Learning English is like building tall buildings. Grammar is the basic framework and words are bricks.）
            </div>
          </div>
        </section>
        <section>
          <div class="title">关于我们</div>
          <div class="tutor_item">
            <div class="tutor_img">
              <x-img :offset="-100" :src="aboutImg" :height="height" :default-src="aboutImg"></x-img>
            </div>
            <div class="bord_radius">
              <div class="item">
                致英致力于小/初/高个性化辅导、学科同步辅导、补差培优、家庭教育咨询服务于一体化的教育培训机构。我们汇聚众多优秀教师智慧，长期以来积累了极其丰富而且颇具实效的个性化辅导案例。我们深信：适合孩子特点的优秀教师是提高学生成绩的关键！我们的教育理念：激发学习兴趣，优化学习方法及习惯，有针对性地查缺补漏，选择我们，给孩子一个改变的机会，实现快乐高效地学习。联系地址：府前路公安局对面
              </div>
            </div>
          </div>
        </section>
      </box>
      <box class="foot-flex">
        <x-button type="primary" @click.native="handLogin">电话咨询</x-button>
      </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { loginByUsername } from '@/config/api'
import imgURL1 from '../assets/1.jpg'
import aboutImg from '../assets/about.jpg'
export default {
  data () {
    return {
      height:'180px',
      imgURL1: imgURL1,
      aboutImg: aboutImg,
      ad_list:[{
        url: 'javascript:',
        img: aboutImg,
        title: '恭喜致英官网正式开通'
      }]
    }
  },
  created(){
    this.height = document.body.clientWidth*0.48+'px'
  },
  mounted(){
    let url = 'http://127.0.0.1:8081/api/v1/userSignIn';
    // fetch(url).then((result) => {
    //   setTimeout(()=>{
    //     this.$store.dispatch('UserName', result.url);
    //   },2000)
    // })
    // this.$http.get('/api/v1/json').then((data)=>{
    //   console.log(data)
    // })
  },
  methods: {
    ...mapActions(['Login']),
    ad_onIndexChange: (e)=>{
      console.log(e)
    },
    handLogin:()=>{
      window.location.href = "tel:18485363312";
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
section{
  /* 标题 */ 
  & .title{
    text-align: center;
    margin-top: 25px;
    color: @theme-color;
    font-weight: bold;
  }
  /* 副标题 */ 
  & .vux-divider{
    margin-bottom: 20px;
  }
  & .bord_radius{
    border: 1px solid @ccc;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  /* 优势 */ 
  & .feature_item{
    padding: 10px 20px;
    box-sizing: border-box;
    & .feature{
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 5px solid @theme-color;
    }
  }
  /* 专属导师、教师简介、关于我们 */ 
  & .tutor_item{
    margin-bottom: 15px;
    & .tutor_img img{
      height: 180px;
      width: 100%;
      border-radius: 5px 5px 0 0;
      vertical-align: middle;
    }
    & .item{
      padding: 10px;
      box-sizing: border-box;
      text-align: justify;
    }
  }
  &:nth-child(3),
  &:nth-child(5){
    & .title{
      margin-bottom: 20px;
    }
    & .bord_radius{
      border: 1px solid fade(@ccc, 20%)
    }
    & .item{
      text-indent: 25px;
    }
  }
  /* 课程 */ 
  & .feature{
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
}
/* 电话 */ 
.foot-flex{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  & button{
    border-radius:0;
  }
}
</style>
