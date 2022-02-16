import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/stats/transaction/detail/list',
        method: 'get',
        params: query
    })
}

