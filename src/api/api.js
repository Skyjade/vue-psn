import axios from 'axios';
import { post, del, put } from '../api/common'
let base = '';
let basePsn = '/psn-server';

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
export const addStatistics = params => { return post(`${basePsn}/assestStatistics`, { params: params }).then(res => res.data); };
export const updStatistics = params => { return put(`${basePsn}/assestStatistics`, { params: params }).then(res => res.data); };
export const delStatistics = params => { return del(`${basePsn}/assestStatistics`, { params: params }).then(res => res.data); };
export const queryStatisticsList = params => { return post(`${basePsn}/assestStatistics/list`, { params: params }).then(res => res.data); };