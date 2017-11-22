import axios from 'axios';


import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});



export const getOptionList = params => { 
    return instance.get(`${base}/api/catalog/option/list`, { params: params })
    //return axios.get(`${base}/user/list`, { params: params }); 
};

export const getOptionListPage = params => { 
    //return axios.get(`${base}/user/listpage`, { params: params }); 
    return instance.get(`${base}/api/catalog/option/list`, { params: params })
};

export const removeOption = params => { 
    return instance.delete(`${base}/api/catalog/option/operate`, { params: params }); 
};

export const getOptionGroup = params =>{
    return instance.get(`${base}/api/catalog/optiongroup/list`, { params: params }); 
}


export const editOption = params => { 
    return instance.put(`${base}/api/catalog/option/operate`,  params ); 
};

export const addOption = params => { 
    //return axios.get(`${base}/user/add`, { params: params }); 
    console.log(params)
    return instance.post(`${base}/api/catalog/option/operate`,  params ); 
};

export const addOptionGroup = params =>{
    return instance.post(`${base}/api/catalog/optiongroup/operate`,  params ); 
}

export const delOptionGroup = params =>{
    return instance.delete(`${base}/api/catalog/optiongroup/operate`,  { params: params } ); 
}

