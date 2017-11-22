import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});



export const getProductOptionListPage = params => { 
    return instance.get(`${base}/api/catalog/productoption/list`, { params: params })
};

export const editProductOption = params => { 
    return instance.put(`${base}/api/catalog/productoption/operate`, params )
};

export const addProductOption = params => { 
    return instance.post(`${base}/api/catalog/productoption/operate`, params )
};

export const removeProductOption = params => { 
    return instance.delete(`${base}/api/catalog/productoption/operate`,  { params: params } )
};

