import request from '@/utils/request'

// 获取评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 对评论或评论回复点赞
export const giveLikingsComments = id => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: id // 点赞的评论id
    }
  })
}

// 取消对评论或评论回复点赞
export const cancelLikingsComments = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
    // 要取消点赞的评论id或评论回复id
  })
}

// 添加评论或评论回复
export const pushComments = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
