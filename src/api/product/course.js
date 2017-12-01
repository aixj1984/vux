
import syscfg from '../config'

export const getCourseList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/course/list`, { params: params }); 
};
