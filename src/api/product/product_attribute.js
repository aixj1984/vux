import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


export const getProductAttributeListPage = params => { 
    return instance.get(`${base}/api/catalog/productattribute/list`, { params: params })
};

export const editProductAttribute = params => { 
    return instance.put(`${base}/api/catalog/productattribute/operate`, params )
};

export const addProductAttribute = params => { 
    return instance.post(`${base}/api/catalog/productattribute/operate`, params )
};

export const removeProductAttribute = params => { 
    return instance.delete(`${base}/api/catalog/productattribute/operate`,  { params: params } )
};

