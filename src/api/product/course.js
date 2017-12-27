
import syscfg from '../config'

export const getCourseList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/course/list`, { params: params }); 
};


export const getCoursesList = params => {
    return syscfg.instance.get(`${syscfg.base}/api/courses/list`, { params: params }); 
};

export const saveCoursesSetting = params => {
    return syscfg.instance.put(`${syscfg.base}/api/course/setting`, params); 
};


export const purchaseCourses = params => {
    return syscfg.instance.put(`${syscfg.base}/api/course/purchase`, params); 
};
