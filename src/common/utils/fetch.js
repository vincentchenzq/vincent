import axios from 'axios'

//拦截器
var fetch = axios.create({
  baseURL: '',
  timeout: 1000
});

// 添加一个请求拦截器
fetch.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
fetch.interceptors.response.use(function (response) {
  if(response.status===200 && response.data && response.data.code==='888'){
    return response.data;
  }else{
    return Promise.reject(response);
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


export  default fetch
