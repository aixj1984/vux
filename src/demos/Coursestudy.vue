<template>
  <div>
    <!--
    <cell :title="$t('General')" >
        <span slot="title" style="color:green;"> <badge text="100"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
    </cell>
    <checklist  :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
    -->

    <swiper height="500px" :show-dots="false">
      <swiper-item class="black" v-for="i in 3" :key="i">
        <cell :title="$t('General')" >
          <span slot="title" style="color:green;"> <badge text="100"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
        </cell>
        <checklist  :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
      </swiper-item>
    </swiper>
    <box gap="10px">
      <x-progress :percent="percent2" :show-cancel="false"></x-progress>
    </box>

  </div>
</template>

<i18n>
Set max=1 (radio mode):
  zh-CN: <div style ="size:25px">max=1（单选模式）asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas</div>
Reference:
  zh-CN: 相关
See also:
  zh-CN: 参见
General:
  zh-CN: 通用aksldjfkasflasdjfklj_______klasdjfklasdjflkasdjflkasdjfklds:?
Messages:
  zh-CN: 在热量转移过程，伴随有能量形式转变的热传递是？
</i18n>

<script>
import { Group, CellBox, Checklist, Cell, Divider, XButton,FormPreview,Badge,Swiper,SwiperItem,XProgress,Box } from 'vux'
import _ from 'lodash'

export default {
  mounted () {
    setTimeout(() => {
      this.asyncList = ['A', 'B', 'C', 'D']
    }, 3000)
  },
  components: {
    Group,
    Checklist,
    Cell,
    Divider,
    XButton,
    CellBox,
    Badge,
    Swiper,
    SwiperItem,
    XProgress,
    Box
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    }
  },
  data () {
    return {
      title:"abc",
      fullValues: [],
      labelPosition: '',
      percent2: 60,
      error: '',
      commonList: [ 'A.热传导', 'B.热对流', 'C.对流辐射' ,'D.热辐射'],

      radioValue: ['A.热传导']
    }
  }
}
</script>

<style scoped>

.black {
  background-color: #FFFFFF;
}

.title{
  line-height: 100px;
  text-align: center;
  color: #000;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
</style>
