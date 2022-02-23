import request from '@/utils/request'

export function fetchSummary(query) {
  return request({
    // url: '/ott/transaction/clearing/summary',
    url: 'https://club-service.codegene.xyz/admin/clearingDetail',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    // url: '/ott/transaction/clearing/list',
    url: 'https://club-service.codegene.xyz/admin/clearingDetail',
    method: 'get',
    params: query
  })
}

export function fetchDetail(query) {
  return request({
    url: '/ott/transaction/clearing/detail',
    method: 'get',
    params: query
  })
}
