<template>
  <div style="height:100%" >

    <x-header title="模拟测试"
          :right-options="{showMore: true}" @on-click-more="onClickMore">
          <!--
          <span  @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          
          <div class="overwrite-title-demo" slot="overwrite-title">
            <button-tab>
              <button-tab-item  selected @on-item-click="closeAnswer">测试</button-tab-item>
              <button-tab-item  @on-item-click="showAnswer">学习</button-tab-item>
            </button-tab>
          </div>
          -->
    </x-header>
    <div v-if="currentData.length==0">
      <msg title="非常抱歉" description="该测试还未设置题目"  :icon="icon"></msg>
    </div>
    <box gap="10px" v-if="currentData.length>0">
      <x-progress :percent="percent" :show-cancel="false"></x-progress>
    </box>
    <div class="swiper-container" v-if="currentData.length>0">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, i) in currentData" :key="i" >
            <cell >
              <span slot="title" style="color:green;"> <badge :text="item.index+1"></badge>：<span style="vertical-align:middle;">{{ item.title }}</span></span>
            </cell>
            <checklist ref="OptionList" :options="item.Options" v-model="item.Chooses" :max="1" @on-change="change"></checklist>
            <br/>
            <div v-if="isSubmit">
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
     <div style="padding:15px;" v-if="showSubmit && !isSubmit">
      <x-button @click.native="submitClick()" type="primary" >提交测试 </x-button>
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
                      <li v-for="i in (QuestionsData.length-index*50)>50?50:(QuestionsData.length-index*50)"  v-bind:class="{ hasBeenAnswer: IsMakeAnswer(i,index), errorAnswer:IsError(i,index) }" v-on:click="onItemClick(i+index*50)" ><a href="javascript:void(0);">{{i+index*50}}</a></li>
                    </ul>
                </div>
              </swiper-item>
            </swiper>
          </div>
        </div>
      </popup>
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
import { Group, CellBox,Popup, Checklist,Msg,Confirm, Cell, Divider,XDialog, XButton,FormPreview,Badge,Swiper,SwiperItem,XProgress,Box ,XHeader,ButtonTab, ButtonTabItem,TransferDom, Tab, TabItem,Toast,XSwitch} from 'vux'
import _ from 'lodash'

import Swiper3 from '../../static/js/swiper-4.0.7/js/swiper.js'
//import Swiper3 from '../../static/swiper-3.4.2.min.js'

import { getTestQuestionList,saveCollectQuestion,delCollectQuestion} from '../api/product/question';

import { addTestResult} from '../api/product/test';



function isEquals(a, b) {
    return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
}

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
    Msg,
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
      icon:'info',
      labelPosition: '',
      swiperSize : 5,
      mySwiper:null,
      dataLength : 15 ,
      percent: 0,
      list2:['1~50', '51~100'],
      demo2: '1~50',
      index:0,
      error: '',
      IsShouChang:false,
      showQuestionList : false,
      toastType: 'success',
      showToast: false,
      toastMsg:"",
      currentData:[],
      currentIndex: 0,
      QuestionsData:[],
      showShouChangConfirm:false,
      showSubmit:false,
      testAnswer:"",
      isSubmit:false,
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
    IsMakeAnswer(index, page){
      //console.log(this.QuestionsData)
      //console.log(index, page)
      index = index -1
      if (this.QuestionsData.length >0 && this.QuestionsData[index+page*50].Chooses.length>0){
        return true
      }
      return false
    },
    IsError(index, page){
      index = index -1
      if (this.QuestionsData[index+page*50].IsRight == 0){
        return true
      }
      return false
    },

    saveTestResult(right_num){
      let para = {
					QuestionNum: this.QuestionsData.length,
					RightNum:right_num,
          CourseId:parseInt(this.CourseId),
          TestId:parseInt(this.TestId),
          TestSec:100,
				};
				addTestResult(para).then((res) => {
          console.log(res)
        })
    },
    change (val, label) {

      
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

    submitClick(){
      
      for(var index=1;index < this.QuestionsData.length;index++){
          if (this.QuestionsData[index].Chooses.length == 0){
          this.showQuestionList = true
          return
        }
      }

      let right_count = 0
      for(var index=0;index < this.QuestionsData.length;index++){
        if (isEquals(this.QuestionsData[index].Answers, this.QuestionsData[index].Chooses)){
          this.QuestionsData[index].IsRight = 1
          right_count += 1
        }else{
          this.QuestionsData[index].IsRight = 0
        }
      }

      if (right_count ==  this.QuestionsData.length){
        this.testAnswer = "恭喜你，全部正确 100 分！"
      }else{
        this.testAnswer = "您的得分 ： " + right_count*100/this.QuestionsData.length
      }
      
      this.saveTestResult(right_count)

      let _this = this
      this.$vux.alert.show({
        title: _this.testAnswer,
        content: '测试结果' ,
        onShow () {
          //console.log('plugin show')
        },
        onHide () {
          //console.log('plugin hide')
          _this.isSubmit = true
          if (right_count != _this.QuestionsData.length){
            _this.showQuestionList = true
          }
        }
      })
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
                    _this.mySwiper.updateSlides();
                    _this.mySwiper.slideTo(0, 500, true);
                    this.swipeDirection = ""
                }else if (this.swipeDirection == 'prev' &&   this.activeIndex == 0  && _this.currentIndex > 0){
                    _this.currentIndex -= _this.swiperSize
                    _this.currentData = _this.QuestionsData.slice(_this.currentIndex  , _this.currentIndex+ _this.swiperSize)
                    _this.mySwiper.updateSlides();
                    _this.mySwiper.slideTo(_this.swiperSize-1, 500, false);
                    this.swipeDirection = ""
                }
              }
            }
          })
    },
    onItemClick(index){
      //console.log(index)
      this.showQuestionList = false
      let swiper_index =  (index-1)%5

      if (swiper_index == this.mySwiper.activeIndex){
          this.percent = index*100/this.dataLength
          if (this.percent == 100){
              this.showSubmit = true
          }else{
            this.showSubmit = false
          }
      }
      console.log(swiper_index, this.mySwiper.activeIndex)
      if (index>= this.currentIndex+1 && index <= this.currentIndex + this.swiperSize){
          this.mySwiper.slideTo(swiper_index, 500, true);
      }else{
        this.currentIndex = Math.floor((index-1)/5)*5
        //console.log(this.currentIndex)
        this.currentData = this.QuestionsData.slice(this.currentIndex , this.currentIndex+ this.swiperSize)
        this.mySwiper.slideTo(swiper_index, 500, true);
        //console.log(this.currentData)
      }
    },
    getTestQuestion() {
				let para = {
					page: 1,
					limit:200,
          courseid:this.CourseId,
          testid:this.TestId,
				};
        let _this = this
        this.QuestionsData.splice(0);
        this.currentData.splice(0);
				getTestQuestionList(para).then((res) => {
          if (res.data.data){
            console.log(res.data.data)
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
                Id : value.Id,
                Options : new_options,
                Answers : value.Answer.length>0?value.Answer.split(":"):[],
                Chooses : [],
                IsCollect : value.IsCollect >0? true: false,
                IsRight : 1,
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

.errorAnswer {
	background: #ec5d8e;
	color:#fff;
}

.swiper-wrapper {
  height:100%
}

</style>
