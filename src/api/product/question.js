

import syscfg from '../config'

export const getTestQuestionList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/test/question/list`, { params: params }); 
};


