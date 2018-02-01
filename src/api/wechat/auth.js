import wx from 'weixin-js-sdk'
import Vue from 'vue'
import api from '@/api/api';
import Util from '../utils/util'

const jsApiCall = (self,params) => {
  WeixinJSBridge.invoke('getBrandWCPayRequest',params,
    function(res){
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      // alert(res.err_code+','+res.err_desc+','+res.err_msg);
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        Util.ts('支付成功');
        self.$router.push({path: '/opus'});
      }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
        self.$router.push({path: '/opus'});
      }else if(res.err_msg == "get_brand_wcpay_request:fail" ){
        Util.ts('支付失败');
        self.$router.push({path: '/opus'});
      }
    }
  );
}

const wxPay = (self,params) => {
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', jsApiCall(self,params), false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', jsApiCall(self,params));
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall(self,params));
    }
  }else{
    jsApiCall(self,params);
  }
}

export default wxPay
