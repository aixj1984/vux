<template>
  <div>
    <div v-if="Courses.length > 0">
      <checklist ref="demoObject" title="选择需要在首页展示的课程" :options="Courses" label-position="left" v-model="DefalueSelect" @on-change="change"></checklist>
      <div style="padding:15px;">
        <x-button type="primary" @click.native="SaveSeting()">保存设置</x-button>
      </div>
    </div>
    <div v-if="Courses.length == 0">
      <card :header="{title: '课程设置'}" :footer="{title: '点击去购买',link:'/customer/course/buy'}">
        <p slot="content" class="card-padding">没有购买任何课程！</p>
      </card>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="alarmtext" position="top"></toast>
  </div>
</template>


<script>
import { Group, CellBox, Checklist, Cell, Divider, XButton,Toast,Card } from 'vux'
import _ from 'lodash'

import { getCourseList,saveCoursesSetting} from '../api/product/course';

import {getCookie,setCookie} from '../api/util'

export default {
  mounted () {

  },
  created(){
    this.getCustomerCourse()
  },

  components: {
    Group,
    Checklist,
    Cell,
    Divider,
    XButton,
    CellBox,
    Toast,
    Card
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
    },
    SaveSeting(){
      let fullValues = this.$refs.demoObject.getFullValue()
      console.log(fullValues)
      if (fullValues.length == 0){
        this.alarmtext = "至少选择一个"
        this.showPositionValue = true
        return
      }
      let chooses = ""
      fullValues.forEach(function(item){
        chooses +=  item.value.toString()  + ","
        console.log(chooses)
      })
      
      let para = {
        DefalutCourses : chooses.substr(0,chooses.length-1),
        //CustomerId : parseInt(getCookie("UID")),
      }
      saveCoursesSetting(para).then((res) => {
        console.log(res)
        if (res.data.code == 0){
            this.alarmtext = "保存成功"
            this.showPositionValue = true
        }else{
            this.alarmtext = res.data.msg
            this.showPositionValue = true
            this.getCustomerCourse()
        }
      }).catch(function(error){
        console.log(error)
      })

    },
    getCustomerCourse() {
      let para = {
        page: 1,
        limit:500,
        //customerid:1,
      };
      
      getCourseList(para).then((res) => {
        console.log(res)
        if (res.data.code != 0){
          console.log("请求错误:"+ res.data.msg)
        }else{
            this.Courses = []
            this.DefalueSelect=[]
            let _this = this
            res.data.data.forEach(function(value){
              if (value.Status > 0 ){
                _this.Courses.push({key:value.Id,value:value.Name})
                if (value.IsDisplay == 1){
                  _this.DefalueSelect.push(value.Id)
                }
              }
            })
        }
      }).catch(function(error){
        console.log(error);
      });
    }
  },
  data () {
    return {
      labelPosition: '',
      error: '',
      Courses:[],
      alarmtext:'至少选择一个',
      showPositionValue:false,
      DefalueSelect:[],
    }
  }
}
</script>

<style scoped>
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
.card-padding {
  padding: 15px;
}
</style>
