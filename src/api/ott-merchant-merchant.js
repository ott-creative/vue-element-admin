import request from '@/utils/request'
import escapeParam from '../utils/escape';

export function fetchList(query) {
    return request({
        url: '/ott/merchant/merchant/list',
        method: 'get',
        params: escapeParam(query)
    })
}

export function fetchDetail(query) {
    return request({
        url: '/ott/merchant/merchant/detail',
        method: 'get',
        params: query
    })
}

export function createMerchant(data) {
    return request({
        url: '/ott/merchant/merchant/create',
        method: 'post',
        data
    })
}

export function updateMerchant(data) {
    return request({
        url: '/ott/merchant/merchant/update',
        method: 'post',
        data
    })
}


