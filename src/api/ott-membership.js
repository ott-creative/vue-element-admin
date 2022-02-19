import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/ott/membership/list',
    method: 'get',
    params: query
  })
}

export function fetchDetail(query) {
  return request({
    url: '/ott/membership/detail',
    method: 'get',
    params: query
  })
}

export function createMember(data) {
  return request({
    url: '/ott/membership/create',
    method: 'post',
    data
  })
}

export function updateMember(data) {
  return request({
    url: '/ott/membership/update',
    method: 'post',
    data
  })
}
