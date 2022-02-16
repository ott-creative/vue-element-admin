import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/stats/membership-consume/list',
        method: 'get',
        params: query
    })
}

