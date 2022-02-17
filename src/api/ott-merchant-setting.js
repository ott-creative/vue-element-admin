import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/merchant/setting/list',
        method: 'get',
        params: query
    })
}

