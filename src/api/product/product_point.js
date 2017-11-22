import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});



export const getProductPoint = params => { 
    return instance.get(`${base}/api/catalog/productreward/list`, { params: params })
};

export const editProductPoint = params => { 
    return instance.put(`${base}/api/catalog/productreward/operate`, params )
};

export const addProductPoint = params => { 
    return instance.post(`${base}/api/catalog/productreward/operate`, params )
};
