import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/ott/merchant/setting/list',
    url: 'https://club-service.codegene.xyz/admin/subMerchantClearingSettingList',
    method: 'get',
    params: query
  })
}

export function createMerchantSetting(data) {
  return request({
    // url: '/ott/merchant/setting/create',
    url: 'https://club-service.codegene.xyz/admin/setUpClearingRule',
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
