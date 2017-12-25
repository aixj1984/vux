import syscfg from '../config'

export const getTestResultList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/testresult/list`, { params: params }); 
};

export const addTestResult = params => {
    return syscfg.instance.put(`${syscfg.base}/api/testresult/add`,  params ); 
};