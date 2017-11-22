import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});



export const getProductImage = params => { 
    return instance.get(`${base}/api/catalog/productimage/list`, { params: params })
};

export const editProductImage = params => { 
    return instance.put(`${base}/api/catalog/productimage/operate`, params )
};

export const addProductImage = params => { 
    return instance.post(`${base}/api/catalog/productimage/operate`, params )
};


export const delProductImage = params => { 
    return instance.delete(`${base}/api/catalog/productimage/operate`, { params: params } )
};
