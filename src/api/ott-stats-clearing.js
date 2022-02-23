import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/stats/clearing/list',
    url: 'https://club-service.codegene.xyz/admin/ClearingStatement',
    method: 'get',
    params: query
  })
}

