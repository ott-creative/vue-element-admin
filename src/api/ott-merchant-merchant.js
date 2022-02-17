import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/merchant/merchant/list',
        method: 'get',
        params: query
    })
}

