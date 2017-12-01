//基础url
import axios from 'axios';


let baseurl = 'http://10.0.64.39:8000'
//let baseurl = "http://10.0.63.37:8000"
//let baseurl = ''

let syscfg = {
    base :baseurl,
    instance: axios.create({
        headers: {'content-type': 'application/json;charset=UTF-8'},
        withCredentials:true,
        credentials: 'include'
    })
}


export default syscfg;
