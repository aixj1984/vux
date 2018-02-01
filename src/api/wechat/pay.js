import wx from 'weixin-js-sdk';

const bridgeInvoke = (callback, params) => {
  WeixinJSBridge.invoke('getBrandWCPayRequest', params,
    function (res) {
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      alert(res.err_code + ',' + res.err_desc + ',' + res.err_msg);
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        if (callback.success) {
          callback.success();
        }
      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        if (callback.cancel) {
          callback.cancel();
        }
      } else if (res.err_msg == "get_brand_wcpay_request:fail") {
        if (callback.fail) {
          callback.fail();
        }
      }
    }
  );
}

const wxPay = (callback, params) => {
  if (callback.success) {
    //alert('ok');
  }
  if (typeof WeixinJSBridge == "undefined") {
    //alert('step2')
    if (document.addEventListener) {
      //alert('step4')
      document.addEventListener('WeixinJSBridgeReady', bridgeInvoke(callback, params), false);
    } else if (document.attachEvent) {
      //alert('step5')
      document.attachEvent('WeixinJSBridgeReady', bridgeInvoke(callback, params));
      document.attachEvent('onWeixinJSBridgeReady', bridgeInvoke(callback, params));
    }
  } else {
    //alert('step3')
    bridgeInvoke(callback, params);
  }
}

export default wxPay