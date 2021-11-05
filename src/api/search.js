import request from '@/utils/request'

export const userSearchRecord = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const userSearchResult = data => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: data
  })
}
