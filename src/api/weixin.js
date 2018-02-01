import syscfg from './config'


export const handleError = (err, component) => {
    if (err.response && err.response.status === 401) {
        let url = syscfg.wxUrl +  component.$route.path;
        window.location.href = url;
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
