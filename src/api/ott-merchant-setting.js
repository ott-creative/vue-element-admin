import request from '@/utils/request'

export function fetchList(query) {
    return request({
        // url: '/ott/merchant/setting/list',
        url: 'https://club-service.codegene.xyz/admin/subMerchantClearingSettingList',
        method: 'get',
        params: query
    })
}

/*
 temp: {
    main_merchant_id: MAIN_MERCHANT_ID,
    merchant_info: null,
    clearing_rule: "Fixed Amount",
    clearing_value: 10,
    minimum_settlement_amount: 100,
    settlement_period: 0,
},
      
{ "main_merchant_id": "8880001", "main_merchant_name": "Golf Shop", "sub_merchant_id": "8880004", "sub_merchant_name": "Ralph Lauren Corporation", "sub_merchant_type": "Corporation", "clearing_rule": "Fixed Percentage", "clearing_fee": "", "clearing_percentage": "0.4", "min_set_amount": 0.00, "set_period": "T+1"}
*/
export function createMerchantSetting(data) {
    var body = new FormData();
    body.append('data', JSON.stringify({
        main_merchant_id: "8880001",
        main_merchant_name: "Phoenix Club",
        sub_merchant_id: data.merchant_info.merchant_id,
        sub_merchant_name: data.merchant_info.merchant_name,
        sub_merchant_type: data.merchant_info.merchant_type,
        clearing_rule: data.clearing_rule,
        clearing_fee: data.clearing_rule == "Fixed Amount" ? data.clearing_value : 0,
        clearing_percentage: data.clearing_rule == "Fixed Percentage" ? data.clearing_value : 0,
        min_set_amount: data.minimum_settlement_amount,
        set_period: `T+${data.settlement_period}`
    }));

    return request({
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: body,
        url: 'https://club-service.codegene.xyz/admin/setUpClearingRule'
    })

    /*return request({
        // url: '/ott/merchant/setting/create',
        url: 'https://club-service.codegene.xyz/admin/setUpClearingRule',
        method: 'post',
        data
    })*/
}

export function updateMerchantSetting(data) {
    var body = new FormData();
    body.append('data', JSON.stringify({
        main_merchant_id: "8880001",
        main_merchant_name: "Phoenix Club",
        sub_merchant_id: data.merchant_info.merchant_id,
        sub_merchant_name: data.merchant_info.merchant_name,
        sub_merchant_type: data.merchant_info.merchant_type,
        clearing_rule: data.clearing_rule,
        clearing_fee: data.clearing_rule == "Fixed Amount" ? data.clearing_value : 0,
        clearing_percentage: data.clearing_rule == "Fixed Percentage" ? data.clearing_value : 0,
        min_set_amount: data.minimum_settlement_amount,
        set_period: `T+${data.settlement_period}`
    }));

    return request({
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: body,
        url: 'https://club-service.codegene.xyz/admin/setUpClearingRule'
    });
}

export function deleteMerchantSetting(query) {
    return request({
        url: 'https://club-service.codegene.xyz/admin/delClearing',
        method: 'get',
        params: query
    });
}
