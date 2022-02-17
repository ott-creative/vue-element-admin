import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/transaction/refund/list',
        method: 'get',
        params: query
    })
}

