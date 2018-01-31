<template>
  <div >
    <div style="padding:15px">
      <h3 style="text-align: center;"> {{ArticleDetail.Title}} </h3>
      <div>
        <div>来源： {{ArticleDetail.Source}} |  发布时间：{{ArticleDetail.PublicTime}}</div>
      </div>
      <div v-html="getConent(ArticleDetail.Content)">
       
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider, Panel, Group, Radio } from 'vux'

import { getArticleDetail} from '../api/article/article';



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
      ArticleDetail:{},
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getConent(encode_content){
        let Base64 = require('js-base64').Base64;
        //console.log(encode_content)
        return Base64.decode(encode_content)
    },

    getArticle(){
        let para = {
          articleid: this.$route.params.id
        };
        getArticleDetail(para).then((res) => {
          //console.log(res)
          if (res.data.code != 0){
            console.log("请求错误:"+ res.data.msg)
          }else{
              this.ArticleDetail = res.data.data
          }
        }).catch(function(error){
          console.log(error);
        });
    }
  }
}
</script>
