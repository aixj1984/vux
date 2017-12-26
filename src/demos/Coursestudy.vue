<template>
  <div>

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
              <span slot="title" style="color:green;"> <badge :text="item.index+1"></badge>：<span style="vertical-align:middle;">{{ item.title }}</span></span>
            </cell>
            <checklist ref="OptionList" :options="item.Options" v-model="item.Chooses" :max="1" @on-change="change"></checklist>
            <br/>
            <div v-if="showAnswerModel">
              <div>
                <divider>参考信息</divider>
              </div>
              <div>
                <cell >
                      <span slot="title" style="color:blue;"> <span style="vertical-align:middle;">答案:{{ item.Answers }}</span></span>
                </cell>
              </div>
                 <group>
                  <x-switch title="收藏题目（高亮表示收藏）" v-model="item.IsCollect" @on-change="ShouChangClick"></x-switch>
                </group> 
            </div>
          </div>
      </div>
 
    </div>
    
    <!--  题目从下面显示
    <div v-transfer-dom>
      <popup v-model="showQuestionList"  is-transparent >
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
    <!--  题目从侧面显示  -->
    <div v-transfer-dom>
      <popup v-model="showQuestionList"  is-transparent position="right" >
         
        <div style="width:210px;background-color:#fff;margin-top:46px;margin-right:2px;border-radius:5px;">
          <br/>
          <span slot="title" style="color:green;"><span>&nbsp;&nbsp;题目列表：</span></span>
          <div>
            <tab :line-width=2 active-color='#fc378c' v-model="index">
              <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" height="400px" :show-dots="false">
              <swiper-item v-for="(item, index) in list2" :key="index">
                <div class="answerSheet">
                    <ul v-if="QuestionsData.length">
                      <li v-for="i in (QuestionsData.length-index*50)>50?50:(QuestionsData.length-index*50)"  v-on:click="onItemClick(i)" ><a href="#">{{i+index*50}}</a></li>
                      <!-- <li v-for="i in currentData.length" v-bind:class="{ hasBeenAnswer: i%2 }" v-on:click="onItemClick(i)" ><a href="#">{{i+index*50}}</a></li> -->
                    </ul>
                </div>
              </swiper-item>
            </swiper>
          </div>
        </div>
      </popup>
    </div>


    <div v-transfer-dom>
      <confirm
      v-model="showShouChangConfirm"
      title="修改题目收藏"
      @on-confirm="onConfirm">
        <p style="text-align:center;">Are you sure?</p>
      </confirm>
    </div>

    <toast v-model="showToast" :time="500" :type="toastType" :text="toastMsg"></toast>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="alarmtext" position="top"></toast>
  
  </div>
</template>

<i18n>

Reference:
  zh-CN: 相关
See also:
  zh-CN: 参见
Messages:
  zh-CN: 在热量转移过程
</i18n>

<script>
import { Group, CellBox,Popup, Checklist,Confirm, Cell, Divider,XDialog, XButton,FormPreview,Badge,Swiper,SwiperItem,XProgress,Box ,XHeader,ButtonTab, ButtonTabItem,TransferDom, Tab, TabItem,Toast,XSwitch} from 'vux'
import _ from 'lodash'

import Swiper3 from '../../static/js/swiper-4.0.7/js/swiper.js'
//import Swiper3 from '../../static/swiper-3.4.2.min.js'

import { getTestQuestionList,saveCollectQuestion,delCollectQuestion} from '../api/product/question';

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
    XDialog,
    Tab,
    TabItem,
    Toast,
    XSwitch,
    Confirm

  },

  data () {
    return {
      drawerVisibility: false,
      title:"abc",
      CourseId:0,
      TestId:0,
      fullValues: [],
      labelPosition: '',
      swiperSize : 5,
      mySwiper:null,
      dataLength : 15 ,
      percent: 0,
      list2:['1~50', '51~100'],
      demo2: '1~50',
      index:0,
      error: '',
      showAnswerModel:false,
      showQuestionList : false,
      toastType: 'success',
      showToast: false,
      toastMsg:"",
      currentData:[],
      currentIndex: 0,
      QuestionsData:[],
      IsShouChang:false,
      showShouChangConfirm:false,
      showPositionValue:false,
      alarmtext:"",
      
    }
  },
  created(){
       //console.log(this.currentData)
      this.CourseId = this.$route.params.courseid
      this.TestId =  this.$route.params.testid

      this.getTestQuestion()
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
      if (this.mySwiper && label.length > 0){
        console.log('swiper_index', this.mySwiper.activeIndex)
        console.log('question', this.currentData)
        if (!this.showAnswerModel){
          if (this.currentData[this.mySwiper.activeIndex].Answers.length >0){
            if (val == this.currentData[this.mySwiper.activeIndex].Answers['0']){
              this.toastMsg = "选对了"
              this.showToast = true
              this.toastType = 'success'
            }else{
              this.toastMsg = "Try Again"
              this.showToast = true
              this.toastType = 'cancel'
            }
          }
        }
        
        //console.log(this.$refs.OptionList[this.mySwiper.activeIndex].getFullValue())
      }
      
    },
    ShouChangClick(newVal){
      console.log(newVal)
      let para = {
        QuestionId: this.currentData[this.mySwiper.activeIndex].Id,
        CourseId : parseInt(this.CourseId),
      }
      if (newVal){
        this.saveCollect(para)
      }else{
        this.delCollect(para)
      }
    },

    saveCollect(para){
      saveCollectQuestion(para).then((res) => {
        if (res.data.code == 0){
            this.alarmtext = "设置成功"
            this.showPositionValue = true
        }else{
            this.alarmtext = res.data.msg
            this.showPositionValue = true
        }
      }).catch(function(error){
        console.log(error)
      })
    },
    delCollect(para){
      delCollectQuestion(para).then((res) => {
        if (res.data.code == 0){
            this.alarmtext = "设置成功"
            this.showPositionValue = true
        }else{
            this.alarmtext = res.data.msg
            this.showPositionValue = true
        }
      }).catch(function(error){
        console.log(error)
      })
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        this.show4 = true
        alert(msg)
      }
    },
    onClickMore () {
      this.showQuestionList = true
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
            on:{
              slideChange: function(){
                _this.percent = (_this.currentIndex+_this.mySwiper.activeIndex + 1)*100/_this.dataLength
                if (_this.percent == 100){
                    _this.showSubmit = true
                }else{
                  _this.showSubmit = false
                }
              },
              touchEnd: function(){
                if (this.swipeDirection == 'next' &&   this.activeIndex == (_this.swiperSize -1) && (_this.currentIndex + this.activeIndex+1)< _this.QuestionsData.length){
                    _this.currentIndex += _this.swiperSize
                    let data_len = _this.swiperSize
                    if (_this.dataLength - _this.currentIndex < _this.swiperSize  ){
                        data_len = _this.dataLength - _this.currentIndex
                    }
                    _this.currentData = _this.QuestionsData.slice(_this.currentIndex , _this.currentIndex+ data_len)
                    console.log(_this.currentData)
                    _this.mySwiper.slideTo(0, 500, true);
                    this.swipeDirection = ""
                }else if (this.swipeDirection == 'prev' &&   this.activeIndex == 0  && _this.currentIndex > 0){
                    _this.currentIndex -= _this.swiperSize
                    _this.currentData = _this.QuestionsData.slice(_this.currentIndex  , _this.currentIndex+ _this.swiperSize)
                    _this.mySwiper.slideTo(_this.swiperSize-1, 500, false);
                    this.swipeDirection = ""
                }
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
      let swiper_index =  (index-1)%5
      console.log(this.currentIndex)
      if (index>= this.currentIndex+1 && index <= this.currentIndex + this.swiperSize){
          this.mySwiper.slideTo(swiper_index, 500, true);
      }else{
        this.currentIndex = Math.floor((index-1)/5)*5
        console.log(this.currentIndex)
        this.currentData = this.QuestionsData.slice(this.currentIndex , this.currentIndex+ this.swiperSize)
        this.mySwiper.slideTo(swiper_index, 500, true);
        console.log(this.currentData)
      }
    },
    getTestQuestion() {
				let para = {
					page: 1,
					pagesize:200,
          courseid:this.CourseId,
          testid:this.TestId,
				};
        let _this = this
        this.QuestionsData.splice(0);
        this.currentData.splice(0);
				getTestQuestionList(para).then((res) => {

          if (res.data.data){
            res.data.data.forEach(function(value,index){
              let options = JSON.parse(value.Options)
              if (!options || options.length == 0){
                return
              }
              let new_options=[]
              options.forEach(function(option){
                new_options.push({key:option.OptionKey, value:option.OptionKey+'.'+option.OptionDesc})
              })
              //console.log(options)
              let question = {
                title:value.Title,
                index : index,
                Id:value.Id,
                Options : new_options,
                Answers : value.Answer.length>0?value.Answer.split(":"):[],
                Chooses : [],
                IsCollect : value.IsCollect >0? true: false,
              }
              _this.QuestionsData.push(question)
              //console.log(question)
            })
            _this.dataLength = _this.QuestionsData.length
            
            if (_this.dataLength>0){
                _this.percent = (_this.currentIndex+1)*100/_this.dataLength
                let get_len = _this.swiperSize
                if (_this.dataLength <= get_len){
                  get_len = _this.dataLength
                }
                _this.currentData = _this.QuestionsData.slice(_this.currentIndex , _this.currentIndex+ get_len)
                _this._initSwiper()
                //console.log(111,_this.currentData)
                if (_this.dataLength > 50){
                  _this.list2 = ['1~50', '51~100']
                }else if (_this.dataLength <= 50){
                  _this.list2 = ['1~50']
                }
            }
          }
				});
			},
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

.overwrite-title-demo {
  margin-top: 5px;
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
