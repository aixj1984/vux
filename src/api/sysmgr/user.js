import axios from 'axios';

import base from '../config'


var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


//instance.post(`url`, params).then(res => res.data);


export const getUserListPage = params => {
     return instance.get(`${base}/api/sysmgr/user/list`, { params: params }); 
};

export const removeUser = params => { 
    return instance.delete(`${base}/api/sysmgr/user/operate`, { params: params }); 
};

export const editUser = params => { 
    return instance.put(`${base}/api/sysmgr/user/operate`,  params); 
};

export const addUser = params => { 
    return instance.post(`${base}/api/sysmgr/user/operate`, params ); 
};