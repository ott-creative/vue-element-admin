import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/transaction/transaction/list',
        method: 'get',
        params: query
    })
}

