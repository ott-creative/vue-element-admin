import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/stats/transaction/list',
        method: 'get',
        params: query
    })
}

