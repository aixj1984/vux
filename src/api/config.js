//基础url
import axios from 'axios';
let baseurl = 'http://10.0.62.49:8000'

let syscfg = {
    base :baseurl,
    instance: axios.create({
        headers: {'content-type': 'application/json;charset=UTF-8'},
        withCredentials:true,
        credentials: 'include'
    })
}


export default syscfg;
