import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getCustomerListPage = params => {
     return instance.get(`${base}/api/customer/list`, { params: params }); 
};

export const editCustomer = params => { 
    return instance.put(`${base}/api/catalog/category/operate`,  params); 
};
