<template>
  <div>
    <panel header="文章列表"  :list="list" :type="type" @on-img-error="onImgError"></panel>
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
  }
}
</script>
