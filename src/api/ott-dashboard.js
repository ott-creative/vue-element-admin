import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'https://club-service.codegene.xyz/admin/viewData',
    method: 'get'
  })
}

