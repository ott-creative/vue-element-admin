import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/transaction/transaction/list',
    url: 'https://club-service.codegene.xyz/admin/transactionList',
    method: 'get',
    params: query
  })
}

