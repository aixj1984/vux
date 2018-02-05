import syscfg from './config'


let baseSiteUrl = 'http://testing.foxhelper.cn/#'
export const handleError = (err, component) => {
  alert("handleError", err.response.status)
    if (err.response && err.response.status === 401) {
        let url = syscfg.wxUrl +  "http://testing.foxhelper.cn"//encodeURIComponent(baseSiteUrl+ component.$route.path);
        alert(url)
        window.location.href = (url);
      } else {
        console.log(err)
        //console.log(err.response)
        //console.log(err.response.status)
        //window.location.href = "/innererror";
      }
};


//order
export const   createOrder = order => {
  return syscfg.instance.post(syscfg.baseUrl + '/api/orderinfo/order/operate', order);
}
export const    wxPayInvoke =para => {
  return syscfg.instance.post(syscfg.baseUrl + '/api/wechat/pay', para);
}
