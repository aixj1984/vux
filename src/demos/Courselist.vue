<template>
  <div>
    <panel :header="$t('List of content with Title')" :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<i18n>
List of content with Title:
  zh-CN: 轮机基础列表
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
      type: '3',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '2016年真题',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/coursestudy/0/1'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '2015年真题',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/coursestudy/0/1',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      },
      {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '2014年真题',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/coursestudy/0/1',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }
      ],
      footer: {
        title: this.$t('more'),
        url: 'http://vux.li'
      }
    }
  },
  created () {
    console.log("test-----", this.$route.params.courseid)
    console.log("test-----", this.$route.params.testid)
  }
}
</script>
