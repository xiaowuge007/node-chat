import axios from 'axios'
import { Toast } from 'vant';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 1000*60,
});

//请求前拦截
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//请求后拦截
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.code === 0){
    Toast(response.data.message)
    return {};
  }else{
    return response.data;
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance
