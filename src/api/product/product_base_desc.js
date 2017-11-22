import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});



export const getProductDesc = params => { 
    return instance.get(`${base}/api/catalog/productdescription/list`, { params: params })
    //return axios.get(`${base}/user/listpage`, { params: params }); 
};

export const editProductDesc = params => { 
    return instance.put(`${base}/api/catalog/productdescription/operate`, params )
};

export const addProductDesc = params => { 
    return instance.post(`${base}/api/catalog/productdescription/operate`, params )
};
