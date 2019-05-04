import axios from 'axios';

let base = '';
let basePsn = '';

//原有接口 用户管理
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//后续添加
//资产管理
export const addStatistics = params => { return axios.post(`${basePsn}/assestStatistics/add`, { params: params }); };
export const updStatistics = params => { return axios.put(`${basePsn}/assestStatistics/add`, { params: params }); };
export const delStatistics = params => { return axios.delete(`${basePsn}/assestStatistics/add`, { params: params }); };
export const queryStatisticsList = params => { return axios.post(`${basePsn}/assestStatistics/add`, { params: params }); };