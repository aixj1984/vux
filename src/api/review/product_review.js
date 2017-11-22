import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getProductReviewListPage = params => {
     return instance.get(`${base}/api/review/list`, { params: params }); 
};

export const editProductReview = params => { 
    return instance.put(`${base}/api/review/operate`,  params); 
};

export const confirmProductReview = params => {
    return instance.patch(`${base}/api/review/operate`,  params);
};
