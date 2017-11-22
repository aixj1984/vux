import axios from 'axios';

import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


//instance.post(`url`, params).then(res => res.data);

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getAttributeList = params => { 
    return instance.get(`${base}/api/catalog/attribute/list`, { params: params })
    //return axios.get(`${base}/user/list`, { params: params }); 
};

export const getAttributeListPage = params => { 
    //return axios.get(`${base}/user/listpage`, { params: params }); 
    return instance.get(`${base}/api/catalog/attribute/list`, { params: params })
};

export const removeAttribute = params => { 
    return instance.delete(`${base}/api/catalog/attribute/operate`, { params: params }); 
};

export const getAttributeGroup = params =>{
    return instance.get(`${base}/api/catalog/attributegroup/list`, { params: params }); 
}


export const editAttribute = params => { 
    return instance.put(`${base}/api/catalog/attribute/operate`,  params ); 
};

export const addAttribute = params => { 
    //return axios.get(`${base}/user/add`, { params: params }); 
    console.log(params)
    return instance.post(`${base}/api/catalog/attribute/operate`,  params ); 
};

export const addAttributeGroup = params =>{
    return instance.post(`${base}/api/catalog/attributegroup/operate`,  params ); 
}

export const delAttributeGroup = params =>{
    return instance.delete(`${base}/api/catalog/attributegroup/operate`,  { params: params } ); 
}

