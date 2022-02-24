import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/stats/membership-consume/list',
    url: 'https://club-service.codegene.xyz/admin/membershipConsumption',
    method: 'get',
    params: query
  })
}
