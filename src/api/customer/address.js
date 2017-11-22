import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

export const getCustomerAddressListPage = params => {
     return instance.get(`${base}/api/customer/address/list`, { params: params }); 
};
