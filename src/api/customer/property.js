import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getCustomerPropertyListPage = params => {
     return instance.get(`${base}/api/customer/property/list`, { params: params }); 
};

