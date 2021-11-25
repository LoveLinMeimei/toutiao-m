import request from '../utils/request'

// 用户认证（登录注册）
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 获取短信验证码
export const sendSmd = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户登录信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    /* headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQyOTA0NDAsInVzZXJfaWQiOjE0NDg5MDAzODg5NzQ0OTM2OTYsInJlZnJlc2giOmZhbHNlfQ.yXWOVZBh_iQcxR1adGPgoqeEgKsYhJqN-o3J1zj-pmY'
    } */
  })
}

// 获取文章详情
export const getActileDetail = (articleId) => {
  return request({
    method: 'GET',
    url: `v1_0/articles/${articleId}`
  })
}

// 关注用户
export const followUser = usereId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: usereId
    }
  })
}

// 取消关注用户
export const unFollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
    /* data: {
      target: userId // 关注目标（被关注的用户id）
    } */
  })
}

// 编辑用户个人资料（包含实名认证）
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料（头像、身份证照片）参数Content-Type的值为multipart/form-data
export const editUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
