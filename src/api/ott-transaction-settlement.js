import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/transaction/settlement/list',
    url: 'https://club-service.codegene.xyz/admin/settlementList',
    method: 'get',
    params: query
  })
}

export function fetchDetail(query) {
  return request({
    // url: '/ott/transaction/settlement/detail',
    url: 'https://club-service.codegene.xyz/admin/settlementDetail',
    method: 'get',
    params: query
  })
}

