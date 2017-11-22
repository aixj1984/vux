import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


export const getProductDiscount = params => { 
    return instance.get(`${base}/api/catalog/productdiscount/list`, { params: params })
};

export const editProductDiscount = params => { 
    return instance.put(`${base}/api/catalog/productdiscount/operate`, params )
};

export const addProductDiscount = params => { 
    return instance.post(`${base}/api/catalog/productdiscount/operate`, params )
};
