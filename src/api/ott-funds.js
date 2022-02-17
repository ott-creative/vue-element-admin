import request from '@/utils/request'

export function fetchSummary(query) {
    return request({
        url: '/ott/funds/summary',
        method: 'get',
        params: query
    })
}

export function fetchList(query) {
    return request({
        url: '/ott/funds/list',
        method: 'get',
        params: query
    })
}