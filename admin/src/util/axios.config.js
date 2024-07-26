import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //发送请求带上token
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //拿到token,存储
    console.log(response.headers)
    const {authorization} = response.headers
    authorization && localStorage.setItem('token',authorization)

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //拿到返回值，token过期就重定向
    const{status} = error.response
    if (status === 401) {
     window.location.href=("/login")
    }
    return Promise.reject(error);
  });