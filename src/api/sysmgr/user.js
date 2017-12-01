import syscfg from '../config'


export const getUserListPage = params => {
     return syscfg.instance.get(`${syscfg.base}/api/sysmgr/user/list`, { params: params }); 
};

export const removeUser = params => { 
    return syscfg.instance.delete(`${syscfg.base}/api/sysmgr/user/operate`, { params: params }); 
};

export const editUser = params => { 
    return syscfg.instance.put(`${syscfg.base}/api/sysmgr/user/operate`,  params); 
};

export const addUser = params => { 
    return syscfg.instance.post(`${syscfg.base}/api/sysmgr/user/operate`, params ); 
};