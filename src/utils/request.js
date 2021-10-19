import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
  // baseURL: 'http://api-toutiao-web.itheima.net/'
  // baseURL: 'http://toutiao-app.itheima.net/'
})

// Add a request interceptor 添加一个请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
