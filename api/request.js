/*
 * @Author: maggot-code
 * @Date: 2021-03-15 14:24:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-15 14:28:41
 * @Description: file content
 */
const axios = require('axios');
const { MGaxios, getToken, setToken } = require('maggot-utils');
const { Send } = MGaxios;

setToken('28e643f4-929a-4bd8-9b59-8827a751b005');

const baseAxios = axios.create({ baseURL: '/' });

// 请求拦截器
baseAxios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.token = token;
    }


    return config;
}, error => Promise.reject(error));

export const send = Send(baseAxios);