import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});




export const getCategoryListPage = params => {
     return instance.get(`${base}/api/catalog/category/list`, { params: params }); 
};

export const getRootCategory = params => {
    return instance.get(`${base}/api/catalog/category/list`, { params: params }); 
};


export const removeCategory = params => { 
    return instance.delete(`${base}/api/catalog/category/operate`, { params: params }); 
};

export const editCategory = params => { 
    return instance.put(`${base}/api/catalog/category/operate`,  params); 
};

export const addCategory = params => { 
    return instance.post(`${base}/api/catalog/category/operate`, params ); 
};