//基础url
import axios from 'axios';
//let baseurl = 'http://testing.foxhelper.cn'
let baseurl = 'http://10.0.62.49:8000'
//let baseurl = "http://testing.foxhelper.cn"

let syscfg = {
    base :baseurl,
    wxUrl:'http://testing.foxhelper.cn/api/wechat/login?html_url=',
    //wxUrl:'http://testing.foxhelper.cn/api/wechat/login/?html_url=',
    instance: axios.create({
        headers: {'content-type': 'application/json;charset=UTF-8'},
        withCredentials:true,
        //credentials: 'include'
    })
}


export default syscfg;
