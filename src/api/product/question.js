import syscfg from '../config'

export const getTestQuestionList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/test/question/list`, { params: params }); 
};

export const getCollectQuestionList = params => {
    return syscfg.instance.get(`${syscfg.base}/api/collect/question/list`, { params: params }); 
};

export const saveCollectQuestion = params => {
    return syscfg.instance.post(`${syscfg.base}/api/collect/question/add`,  params ); 
};
export const delCollectQuestion = params => {
    return syscfg.instance.post(`${syscfg.base}/api/collect/question/del`, params ); 
};
