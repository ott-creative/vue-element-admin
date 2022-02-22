import qs from 'qs';
import request from '@/utils/request';
import escapeParam from '../utils/escape';

export function fetchList(query) {
    return request({
        //url: '/ott/merchant/merchant/list',
        url: 'https://club-service.codegene.xyz/admin/subMerchantList',
        method: 'get',
        params: escapeParam(query)
    })
}

export function fetchDetail(query) {
    return request({
        //url: '/ott/merchant/merchant/detail',
        url: 'https://club-service.codegene.xyz/admin/subMerchantInfo',
        method: 'get',
        params: query
    })
}

export function createMerchant(data) {
    var body = new FormData();
    body.append('data', JSON.stringify(data));
    //console.log("post data:", body);

    return request({
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: body,
        url: 'https://club-service.codegene.xyz/admin/newSubMerchant'
    })

    // mock
    /* 
        return request({
            url: '/ott/merchant/merchant/create',
            method: 'post',
            data
        })
    */
}

export function updateMerchant(data) {
    return request({
        url: '/ott/merchant/merchant/update',
        method: 'post',
        data
    })
}


