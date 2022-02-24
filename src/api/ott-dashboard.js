import request from '@/utils/request'

export function fetchList() {
  return request({
    // url: 'https://club-service.codegene.xyz/admin/viewData',
    url: 'http://127.0.0.1:7003/admin/viewData',
    method: 'get'
  })
}

