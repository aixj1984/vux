import axios from 'axios';
import base from '../config'

var instance = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});




export const getContestListPage = params => {
     return instance.get(`${base}/api/matchs/match/list`, { params: params }); 
};

export const getRootContest = params => {
    return instance.get(`${base}/api/matchs/match/list`, { params: params }); 
};


export const removeContest = params => { 
    return instance.delete(`${base}/api/matchs/match/operate`, { params: params }); 
};

export const editContest = params => { 
    return instance.put(`${base}/api/matchs/match/operate`,  params); 
};

export const addContest = params => { 
    return instance.post(`${base}/api/matchs/match/operate`, params ); 
};


export const getContestDesc = params => {
    return instance.get(`${base}/api/matchs/match/list`, { params: params }); 
};


export const editContestDesc = params => { 
    return instance.patch(`${base}/api/matchs/match/operate`,  params); 
};

export const addContestDesc = params => { 
    return instance.post(`${base}/api/matchs/match/operate`, params ); 
};

export const addContestProduct = params => { 
    return instance.post(`${base}/api/matchs/matchproduct/operate`, params ); 
};

export const editContestProduct = params => {
    return instance.patch(`${base}/api/matchs/matchproduct/operate`, params );
};

export const removeContestProduct = params => { 
    return instance.delete(`${base}/api/matchs/matchproduct/operate`, { params: params }); 
};


export const getContestProdctList = params => {
    return instance.get(`${base}/api/matchs/matchproduct/list`, {params : params})
}

