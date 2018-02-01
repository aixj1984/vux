import wx from 'weixin-js-sdk';
import Config from '../config';
import store from './../../store'

const getWechatSign = (url) => {
  return Config.instance.get(Config.baseUrl + '/api/wechat/share/getsign/?html_url=' + url)
}

const wxShare = (options) => {
  let url = ""
  var u = navigator.userAgent;
  
  var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if(ios){
    //ios下使用进入页进行签名
    if(store.state.enterPage){
      url = encodeURIComponent(store.state.enterPage)
    }
  }else{
    //android使用当前页进行签名
    url = window.location.href
  }
  

  getWechatSign(url).then(res => {
    let data = res.data.result;
    wx.config({
      debug: false,
      appId: data.appID,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(() => {
      //alert(JSON.stringify(options))
      wx.onMenuShareTimeline({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success: options.success,
      });

      //friend
      wx.onMenuShareAppMessage({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success: options.success
      });
    });

    wx.error(function (res) {
      //alert(JSON.stringify(res))
    });

  });
}

export default wxShare