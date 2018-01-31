<template>
  <div>
    <panel header=""  :list="ArticleList" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<i18n>
Switch the type:
  zh-CN: 切换样式
List of content with image:
  zh-CN: 
More:
  zh-CN: 查看更多
</i18n>

<script>
import { Panel, Group, Radio } from 'vux'

import { getArticleList} from '../api/article/article';


export default {
  components: {
    Panel,
    Group,
    Radio
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    }
  },
  data () {
    return {
      type: '4',
      ArticleList:[],
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/customer/article/detail/1'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/customer/article/detail/1',
          replace: false
        },
        meta: {
          source: '来源：新浪',
          date: '2017-12-05',
          other: '阅读量：'
        }
      }],
      footer: {
        title: this.$t('more'),
        url: 'http://vux.li'
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    getArticle(){
      let para = {
          page: 1,
          limit:50,
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
