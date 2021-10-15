import request from '../utils/request'

// 用户认证（登录注册）
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'app/v1_0/authorizations',
    data
  })
}

// 获取短信验证码
export const sendSmd = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户登录信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    /* headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQyOTA0NDAsInVzZXJfaWQiOjE0NDg5MDAzODg5NzQ0OTM2OTYsInJlZnJlc2giOmZhbHNlfQ.yXWOVZBh_iQcxR1adGPgoqeEgKsYhJqN-o3J1zj-pmY'
    } */
  })
}
