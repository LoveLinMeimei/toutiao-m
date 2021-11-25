import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
  // baseURL: 'http://api-toutiao-web.itheima.net/'
  // baseURL: 'http://toutiao-app.itheima.net/'
})

const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
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

// Add a response interceptor 添加一个响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 任何位于2xx范围内的状态码都会触发此函数, 请求响应正常进入这里
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 超过2xx的状态码都会进入这里
  // 请求响应失败进入这里
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token无效
    // 如果没有user或者user.token，直接去登录
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 使用refresh_token请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)
      // 拿到新的token之后把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)

      // 把失败的请求重新发出去
      // errror.config是本次请求的相关配置信息对象
      return request(error.config)
    } catch (err) {
      // 刷新token都失败了,直接跳转到登录页
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  // router.replace('/login')
  router.replace({
    name: 'login',
    // redirect是自己取的名字，router.currentRoute当前路由相当于this.router
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
