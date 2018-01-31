import syscfg from './config'

export const requestLogin = params => { return syscfg.instance.post(`${syscfg.base}/login`, params).then(res => res.data); };

export const getUserList = params => { return syscfg.instance.get(`${syscfg.base}/user/list`, { params: params }); };

export const getUserListPage = params => { return syscfg.instance.get(`${syscfg.base}/user/listpage`, { params: params }); };

export const removeUser = params => { return syscfg.instance.get(`${syscfg.base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return syscfg.instance.get(`${syscfg.base}/user/batchremove`, { params: params }); };

export const editUser = params => { return syscfg.instance.get(`${syscfg.base}/user/edit`, { params: params }); };

export const addUser = params => { return syscfg.instance.get(`${syscfg.base}/user/add`, { params: params }); };