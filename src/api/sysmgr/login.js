import axios from 'axios';

import base from '../config'


var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


//instance.post(`url`, params).then(res => res.data);


export const requestLogin = params => {
     return instance.get(`${base}/api/login`, { params: params }); 
};

