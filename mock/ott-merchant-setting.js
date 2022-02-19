const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        merchant_id: '@increment',
        merchant_name: '@first',
        'merchant_type|1': ['Individual', 'Corporate'],
        'clearing_rule|1': ['Fixed Amount', 'Fixed Percentage'],
        'clearing_value|1': [5, 10],
        minimum_settlement_amount: '@integer(10, 20)',
        settlement_period: '@integer(3, 5)',
    }))
}

module.exports = [
    {
        url: '/ott/merchant/setting/list',
        type: 'get',
        response: config => {
            const { type, name, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (type && item.type !== type) return false
                return true
            })

            if (sort === '-merchant_id') {
                mockList = mockList.reverse()
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },
]

