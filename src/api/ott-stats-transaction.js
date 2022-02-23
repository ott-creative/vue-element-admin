import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/stats/transaction/list',
    url: 'https://club-service.codegene.xyz/admin/transactionStatement',
    method: 'get',
    params: query
  })
}

