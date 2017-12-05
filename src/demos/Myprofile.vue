<template>
  <div>
    <div class="center">
      <svg style="width:60px;height:60px;" version="1.1" id="图形" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enable-background="new 0 0 1024 1024" xml:space="preserve"><path class="svgpath" data-index="path_0" fill="#35495e" d="M512 816.64 51.2 985.6l460.8-947.2 460.8 947.2L512 816.64 512 816.64zM509.44 207.36 189.44 862.72l317.44-117.76L506.88 207.36 509.44 207.36zM509.44 207.36" /></svg>
      <h1 class="vux-title" style="display:none;">
        <span class="demo-icon" slot="icon" style="font-size:60px;color:#35495e;">&#xe637;</span>
      </h1>
      <p class="vux-notice">生命不息 奋斗不止</p>
      <p class="vux-notice">学无止境</p>
    </div>
    <br/>
    <group title="">
      <cell title="课程购买" link="/customer/course/buy">
      </cell>
      <cell title="测试记录" link="/customer/test/record" >
      </cell>
      <cell title="课程设置" link="/customer/course/setting" ></cell>
      <cell title="捐赠鼓励" link="/customer/donate" ></cell>
    </group>
  </div>
</template>

<i18n>
My Account:
  zh-CN: 我的账号
</i18n>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.vue-version {
  text-align: center;
  font-size: 12px;
  color: #ccc;
}
.center {
  margin-top: 15px;
  text-align: center;
}
</style>
