import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/ott/merchant/setting/list',
        method: 'get',
        params: query
    })
}

export function createMerchantSetting(data) {
    return request({
        url: '/ott/merchant/setting/create',
        method: 'post',
        data
    })
}

export function updateMerchantSetting(data) {
    return request({
        url: '/ott/merchant/setting/update',
        method: 'post',
        data
    })
}