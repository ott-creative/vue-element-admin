import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/stats/transaction/detail/list',
    url: 'https://club-service.codegene.xyz/admin/transactionDetailStatement',
    method: 'get',
    params: query
  })
}

