import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getCustomerBenefitsListPage = params => {
     return instance.get(`${base}/api/customer/property/benefits`, { params: params }); 
};

