<template>
  <div>
    <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
    <panel header="推荐文章" :footer="footer" :list="ArticleList" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider, Panel, Group, Radio } from 'vux'

import { getArticleList} from '../api/article/article';


const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]



const urlList = baseList.map((item, index) => ({
  url: '#',
  img: item.img,
  fallbackImg: item.fallbackImg,
  title: `(可点击)${item.title}`
}))

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider,
    Panel, 
    Group, 
    Radio
  },
  ready () {

  },
  data () {
    return {
      demo06_list:urlList,
      ArticleList:[],
      demo06_index: 0,
      swiperItemIndex: 1,
      type: '4',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '模拟考试',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/article/detail/1'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '历届真题',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/article/detail/2',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }],
      footer: {
        title: this.$t('更多精彩文章'),
        url: '/article/list'
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    demo06_onIndexChange (index) {
      this.demo06_index = index
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    getArticle(){
      let para = {
          page: 1,
          limit:3,
        };
        getArticleList(para).then((res) => {
          console.log(res)
          if (res.data.code != 0){
            console.log("请求错误:"+ res.data.msg)
          }else{
              this.ArticleList = []
              let _this = this
              res.data.data.forEach(function(value){
                let test= {
                  src: '',
                  title: value.Title,
                  desc: value.Abstract,
                  url: {
                    path: '/article/detail/'+value.Id,
                    replace: false
                  },
                  meta: {
                    source: '来源：'+ value.Source,
                    date: '日期：'+ value.PublicTime.substring(0,10),
                    other: '阅读量：' + value.ReadCount
                  }
                }
                _this.ArticleList.push(test)
              })
          }
        }).catch(function(error){
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
</style>
