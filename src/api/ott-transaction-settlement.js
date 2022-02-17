import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/transaction/settlement/list',
        method: 'get',
        params: query
    })
}

