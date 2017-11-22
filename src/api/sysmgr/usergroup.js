import axios from 'axios';

import base from '../config'



var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});


//instance.post(`url`, params).then(res => res.data);

export const getUserGroupListPage = params => {
     return instance.get(`${base}/api/sysmgr/usergroup/list`, { params: params }); 
};

export const removeUserGroup = params => { 
    return instance.delete(`${base}/api/sysmgr/usergroup/operate`, { params: params }); 
};

export const editUserGroup = params => { 
    return instance.put(`${base}/api/sysmgr/usergroup/operate`,  params); 
};

export const addUserGroup = params => { 
    return instance.post(`${base}/api/sysmgr/usergroup/operate`, params ); 
};