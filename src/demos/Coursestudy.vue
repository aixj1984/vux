<template>
  <div>
    <!--
    <cell :title="$t('General')" >
        <span slot="title" style="color:green;"> <badge text="100"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
    </cell>
    <checklist  :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
    
    -->
    <x-header title="slot:overwrite-title"
          :right-options="{showMore: true}" @on-click-more="onClickMore">
          <span  @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          <div class="overwrite-title-demo" slot="overwrite-title">
            <button-tab>
              <button-tab-item  selected @on-item-click="closeAnswer">测试</button-tab-item>
              <button-tab-item  @on-item-click="showAnswer">学习</button-tab-item>
            </button-tab>
          </div>
        </x-header>

    <box gap="10px">
      <x-progress :percent="percent" :show-cancel="false"></x-progress>
    </box>
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, i) in currentData" :key="i" >
            <cell >
              <span slot="title" style="color:green;"> <badge :text="item.index+1"></badge>：<span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
            </cell>
            <checklist  :options="commonList" v-model="radioValue[i+1]" :max="1" @on-change="change"></checklist>
          </div>
      </div>    
    </div>
    <br/>
    <div v-if="showAnswerModel">
      <div>
        <divider>参考信息</divider>
      </div>
      <div>
        <cell >
              <span slot="title" style="color:red;"> <span style="vertical-align:middle;">{{ $t('Messages') }}</span></span>
        </cell>
      </div>
    </div>

    <!--  题目从下面显示
    <div v-transfer-dom>
      <popup v-model="show7"  is-transparent >
        <div style="width:100%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:2px;">
          <div class="answerSheet">
              <ul>
                  <li v-for="i in 50" v-bind:class="{ hasBeenAnswer: false }" v-on:click="onItemClick(i)" ><a href="#">{{i}}</a></li>
              </ul>
          </div>
        </div>
      </popup>
    </div>
    -->
    <div v-transfer-dom>
      <popup v-model="show7"  is-transparent position="right" >
     
        <div style="width:210px;background-color:#fff;margin-top:0px;margin-right:4px;border-radius:5px;">
          <br/>
          <span slot="title" style="color:green;"><span>&nbsp;&nbsp;题目列表：</span></span>
          <div class="answerSheet">
              <ul>
                  <li v-for="i in 50" v-bind:class="{ hasBeenAnswer: false }" v-on:click="onItemClick(i)" ><a href="#">{{i}}</a></li>
              </ul>
          </div>
        </div>
      </popup>
    </div>
  

  </div>
</template>

<i18n>

Reference:
  zh-CN: 相关
See also:
  zh-CN: 参见
Messages:
  zh-CN: 在热量转移过程，___伴随有能量形式转变的热传递是？
</i18n>

<script>
import { Group, CellBox,Popup, Checklist, Cell, Divider,XDialog, XButton,FormPreview,Badge,Swiper,SwiperItem,XProgress,Box ,XHeader,ButtonTab, ButtonTabItem,TransferDom} from 'vux'
import _ from 'lodash'

import Swiper3 from '../../static/swiper-3.4.2.min.js'


export default {
  mounted () {
    /*
    setTimeout(() => {
      this.asyncList = ['A', 'B', 'C', 'D']
    }, 3000) */
  },
  directives: {
    TransferDom
  },
  components: {
    Group,
    Checklist,
    Cell,
    Divider,
    XButton,
    CellBox,
    Badge,
    Popup,
    Swiper,
    SwiperItem,
    XProgress,
    Box,
    XHeader,
    ButtonTab, 
    ButtonTabItem,
    XDialog
  },

  data () {
    return {
      drawerVisibility: false,
      title:"abc",
      fullValues: [],
      labelPosition: '',
      swiper_index:5,
      swiperSize : 5,
      mySwiper:[],
      dataLength : 15 ,
      percent: 0,
      error: '',
      showAnswerModel:false,
      show7 : false,
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
        ,
        {
          title : "1",
          index : 10
        },
        {
          title : "1",
          index : 11
        },
        {
          title : "2",
          index : 12
        },
        {
          title : "1",
          index : 13
        },
        {
          title : "1",
          index : 14
        }      

      ]
    }
  },
  created(){
      this.percent = (this.currentIndex+1)*100/this.dataLength
      this.currentData = this.data.slice(this.currentIndex , this.currentIndex+ this.swiperSize)
      console.log(this.currentData)
      this._initSwiper()
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    },
    onClickMore () {
      this.show7 = true
    },
    async _initSwiper() {
        let Swiper = await Swiper3; //异步加载的
        let _this = this
        this.mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop:false,
            effect : 'flip',
            flip: {
                  slideShadows : true,
                  limitRotation : true,
            },
            onSlideChangeEnd: function(swiper){
              _this.percent = (_this.currentIndex+swiper.activeIndex + 1)*100/_this.dataLength
            },
            onTouchEnd: function(swiper){
              if (swiper.swipeDirection == 'next' &&   swiper.activeIndex == (_this.swiperSize -1)  && _this.currentIndex + _this.swiperSize < _this.dataLength -1  ){
                  _this.currentIndex += _this.swiperSize
                  let data_len = _this.swiperSize
                  if (_this.dataLength - _this.currentIndex < _this.swiperSize  ){
                      data_len = _this.dataLength - _this.currentIndex
                  }
                  _this.currentData = _this.data.slice(_this.currentIndex , _this.currentIndex+ data_len)
                  console.log(_this.currentData)
                  _this.mySwiper.slideTo(0, 500, true);
                  swiper.swipeDirection = ""
              }else if (swiper.swipeDirection == 'prev' &&   swiper.activeIndex == 0  && _this.currentIndex > 0){
                  _this.currentIndex -= _this.swiperSize
                  _this.currentData = _this.data.slice(_this.currentIndex  , _this.currentIndex+ _this.swiperSize)
                  _this.mySwiper.slideTo(_this.swiperSize-1, 500, false);
                  swiper.swipeDirection = ""
              }
            }
          })
    },
    showAnswer(){
      this.showAnswerModel = true
      //alert(this.mySwiper.activeIndex)
      
    },
    closeAnswer(){
      this.showAnswerModel = false
    },
    onItemClick(index){
      console.log(index)
      this.show7 = false
      index =  index%5
      this.mySwiper.slideTo(index, 500, true);
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

.answerSheet ul{padding:10px; text-align:left;}
.answerSheet li{ display:inline-block;margin-bottom:5px; margin-left:5px;height:30px; width:30px; line-height:30px; text-align:center; border:1px solid #e4e4e4;}
.answerSheet li a{display:block;}
.answerSheet li:hover{color:#389fc3;border-color: #389fc3;}

ul,li{ list-style:none;}
a{ text-decoration:none; color:#666;}
a:hover{text-decoration:none;}
.hover{background:#0f6c8d;}

i{font-style:normal;}

.hasBeenAnswer {
	background: #5d9cec;
	color:#fff;
}


</style>
