import request from '@/utils/request'

export function fetchSummary(query) {
    return request({
        url: '/ott/transaction/clearing/summary',
        method: 'get',
        params: query
    })
}

export function fetchList(query) {
    return request({
        url: '/ott/transaction/clearing/list',
        method: 'get',
        params: query
    })
}

export function fetchDetail(query) {
    return request({
        url: '/ott/transaction/clearing/detail',
        method: 'get',
        params: query
    })
}