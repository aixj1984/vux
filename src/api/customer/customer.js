import syscfg from '../config'

export const getCustomerListPage = params => {
     return syscfg.instance.get(`${syscfg.base}/api/customer/list`, { params: params }); 
};

export const editCustomer = params => { 
    return syscfg.instance.put(`${syscfg.base}/api/catalog/category/operate`,  params); 
};
