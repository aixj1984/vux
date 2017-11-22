import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


export const getProducBaseInfo = params => { 
    return instance.get(`${base}/api/catalog/product/list`, { params: params })
    //return axios.get(`${base}/user/listpage`, { params: params }); 
};

export const editProduct = params => { 
    return instance.put(`${base}/api/catalog/product/operate`, params )
};

export const addProduct = params => { 
    return instance.post(`${base}/api/catalog/product/operate`,  params)
};