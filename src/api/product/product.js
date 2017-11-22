import axios from 'axios';

import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


export const getProductListPage = params => { 
    return instance.get(`${base}/api/catalog/product/list`, { params: params })
    //return axios.get(`${base}/user/listpage`, { params: params }); 
};

export const removeProduct = params => { 
    return instance.delete(`${base}/api/catalog/product/operate`, { params: params }); 
};

export const getProductManageListPage = params => { 
    return instance.get(`${base}/api/catalog/product/managelist`, { params: params })
    //return axios.get(`${base}/user/listpage`, { params: params }); 
};



export const getProductSimpleListPage = params => { 
    return instance.get(`${base}/api/catalog/product/simplelist`, { params: params })
};

