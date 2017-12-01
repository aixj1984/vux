
import syscfg from '../config'

export const getCourseTestList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/coursetest/list`, { params: params }); 
};
