<template>
  <div>
    <div v-if="needBuyList.length >0 ">
      <checklist ref="PurchaseObject" title="还未购买的课程(多买多送)" :options="needBuyList" label-position="left" v-model="chooseNeedBuy" @on-change="change"></checklist>
  

      <group>
        <cell-box>课程总计：<span style="color:blue">{{ Amount }} 元</span>&nbsp;&nbsp; 折后：<span style="color:red">{{ DiscountAmount }} 元</span></cell-box>
      </group>
      <div style="padding:15px;">
        <x-button type="primary" @click.native="Purchase()">购买课程</x-button>
      </div>

    </div>

    <checklist  title="已经购买的课程" disabled :options="buyList" label-position="left" v-model="chooseBuy" ></checklist>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="alarmtext" position="top"></toast>

  </div>
</template>


<script>
import { Group, CellBox, Checklist, Cell, Divider, XButton,Toast } from 'vux'
import _ from 'lodash'

import { getCourseList,saveCoursesSetting,purchaseCourses} from '../api/product/course';

import { createOrder, wxPayInvoke,handleError} from '../api/weixin';

import wxPay from '../api/wechat/pay.js'


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
    Toast
  },
  created(){
    this.getAllCourses()
  },
  methods: {
    change (val, label) {
      console.log('change', val, label)
      this.Amount = val.length*120
      this.DiscountAmount = this.Amount*(1-(val.length-1)*0.05)
    },
    Purchase(){
      let fullValues = this.$refs.PurchaseObject.getFullValue()
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
        PurchaseCourses : chooses.substr(0,chooses.length-1),
      }
      createOrder(para).then((res) =>{
        if (res.data && res.data.order_id) {
					let para = {
						'order_id': res.data.order_id,
						'send_sms':_this.value,
					}
					_this.wxPay(para);
				}
      }).catch(err => handleError(err, this))
      /*
      let _this = this
      purchaseCourses(para).then((res) => {
        console.log(res)
        if (res.data.code == 0){
            _this.alarmtext = "购买成功"
            _this.showPositionValue = true
        }else{
            _this.alarmtext = res.data.msg
            _this.showPositionValue = true
        }
        _this.getAllCourses()
      }).catch(function(error){
        console.log(error)
      })*/
    },
    getAllCourses() {
      let para = {
        page: 1,
        limit:500,
        customerid:1,
      };
      
      getCourseList(para).then((res) => {
        console.log(res)
        if (res.data.code != 0){
          console.log("请求错误:"+ res.data.msg)
        }else{
          
            this.needBuyList = []
            this.buyList = []
            this.chooseBuy = []
            this.chooseNeedBuy = []
            
            let _this = this
            res.data.data.forEach(function(value){
              if (value.Status > 0 ){
                _this.buyList.push({key:value.Id,value:value.Name})
                _this.chooseBuy.push(value.Id)
              }else{
                 _this.needBuyList.push({key:value.Id,value:value.Name})
              }
            })
            
        }
      }).catch(function(error){
        console.log(error);
      });
    },
		wxPay: function(para) {
				wxPayInvoke(para).then(axios.spread((res) => {
				if (res.data && res.data.order_no) {
					let param = {
						'appId': res.data.appId,
						'timeStamp': res.data.timeStamp,
						'nonceStr': res.data.nonceStr,
						'package': res.data.package,
						'signType': res.data.signType,
						'paySign': res.data.paySign,
					}
					let me = this;
					var callback = {
						success: function() {
							me.$router.push('/success');
						},
						cancel: function() {
							me.$router.push('/fail');
						},
						fail: function() {
							me.$router.push('/fail');
						},
					}
					wxPay(callback, param)
				}
			})).catch(err => handleError(err, this))
		}
  },
  data () {
    return {
      fullValues: [],
      labelPosition: '',
      error: '',
      needBuyList:[],
      chooseBuy:[],
      buyList:[],
      Amount:0,
      showPositionValue:false,
      alarmtext:"",
      DiscountAmount:0,
      chooseNeedBuy:[],
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
</style>
