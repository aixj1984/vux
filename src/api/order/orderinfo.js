import axios from 'axios';
import base from '../config'

//let base = "http://10.0.65.119:8000"

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getOrderListPage = params => {
     return instance.get(`${base}/api/orderinfo/order/list`, { params: params }); 
};

export const editOrder = params => { 
    return instance.patch(`${base}/api/orderinfo/order/operate`,  params); 
};

export const getOrderStatus = params => { 
    return instance.get(`${base}/api/orderinfo/orderstatus/list`,  params); 
};
