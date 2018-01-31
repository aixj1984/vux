import syscfg from '../config'

export const getArticleList = params => {
     return syscfg.instance.get(`${syscfg.base}/api/article/list`, { params: params }); 
};


export const getArticleDetail = params => {
    return syscfg.instance.get(`${syscfg.base}/api/article/detail`, { params: params }); 
};
