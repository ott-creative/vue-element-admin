import request from '@/utils/request'

export function fetchSummary(query) {
  return request({
    // url: '/ott/funds/summary',
    url: 'https://club-service.codegene.xyz/admin/fundsManagement',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    // url: '/ott/funds/list',
    url: 'https://club-service.codegene.xyz/admin/fundsManagement',
    method: 'get',
    params: query
  })
}
