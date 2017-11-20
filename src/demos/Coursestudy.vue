<template>
  <div>
    <!--
    <cell :title="$t('General')" >
        <span slot="title" style="color:green;"> <badge text="100"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
    </cell>
    <checklist  :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
    -->
    <box gap="10px">
      <x-progress :percent="percent" :show-cancel="false"></x-progress>
    </box>
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in currentData" :key="i" >
        <cell :title="$t('General')" >
          <span slot="title" style="color:green;"> <badge :text="item.index"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
        </cell>
        <checklist  :options="commonList" v-model="radioValue[i+1]" :max="1" @on-change="change"></checklist>
        </div>
        
    </div>
    <!-- 如果需要分页器
    <div class="swiper-pagination"></div>
     -->
    
    <!-- 如果需要导航按钮 
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    -->
    <!-- 如果需要滚动条 
    <div class="swiper-scrollbar"></div>
    -->
    
  </div>



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

import Swiper3 from '../../static/swiper-3.4.2.min.js'


export default {
  mounted () {
    /*
    setTimeout(() => {
      this.asyncList = ['A', 'B', 'C', 'D']
    }, 3000) */
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
  data () {
    return {
      title:"abc",
      fullValues: [],
      labelPosition: '',
      swiper_index:5,
      swiperSize : 5,
      mySwiper:[],
      dataLength : 10 ,
      percent: 0,
      error: '',
      commonList: [ 'A.热传导', 'B.热对流', 'C.对流辐射' ,'D.热辐射'],
      radioValue: ['A.热传导'],
      currentData:[],
      currentIndex: 0,
      data:[
        {
          title : "1",
          index : 0
        },
        {
          title : "2",
          index : 1
        },
        {
          title : "1",
          index : 2
        },
        {
          title : "1",
          index : 3
        },
        {
          title : "1",
          index : 4
        },
        {
          title : "1",
          index : 5
        },
        {
          title : "1",
          index : 6
        },
        {
          title : "1",
          index : 7
        },
        {
          title : "1",
          index : 8
        },
        {
          title : "1",
          index : 9
        }

      ]
    }
  },
  created(){
      this.percent = (this.currentIndex+1)*100/this.dataLength
      this.currentData = this.data.slice(this.currentIndex , this.currentIndex+ this.swiperSize)

      this._initSwiper()
  },
  methods: {
    change (val, label) {
      //console.log('change', val, label)
    },
    async _initSwiper() {
        let Swiper = await Swiper3; //异步加载的
        let _this = this
        this.mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            onSlideChangeStart: function(swiper){
                console.log(swiper.activeIndex);
                console.log(_this.currentIndex)
                console.log(_this.currentIndex+1+parseInt(swiper.activeIndex))
                _this.percent = (_this.currentIndex+1+swiper.activeIndex)*100/_this.dataLength
                console.log(_this.percent)
                
              },
              onSliderMove: function(swiper, event){
                if (swiper.activeIndex ==  _this.swiperSize -  1){
                  _this.currentIndex +=  (_this.swiperSize - 1)
                  
                  _this.currentData = _this.data.slice(_this.currentIndex , _this.currentIndex+ _this.swiperSize)
                }
              }
            
            // 如果需要分页器
            //pagination: '.swiper-pagination',
            
            // 如果需要前进后退按钮
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            
            // 如果需要滚动条
            //scrollbar: '.swiper-scrollbar',
          })
    },
    SwiperOnIndexChange (index) {
      console.log("abbb", index)
      this.percent = (this.currentIndex+1+index)*100/this.dataLength

      if (index ==  this.swiperSize -  1){
        this.currentIndex +=  (this.swiperSize - 1)
        
        this.currentData = this.data.slice(this.currentIndex , this.currentIndex+ this.swiperSize)
        
      }
      this.swiper_index = 2

    }
  },
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
