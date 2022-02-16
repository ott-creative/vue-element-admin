import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/stats/clearing/list',
        method: 'get',
        params: query
    })
}

