const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        amount: '@integer(100, 500)',
        'type|1': ['Charge', 'Consume'],
        'merchant_clearing_rule|1': ['Fixed Amount', 'Fixed Percent'],
        merchant_clearing_percent: '@integer(10, 20)',
        merchant_name: '@first',
        merchant_clearing_fee: '@integer(100, 500)',
        'platform_clearing_rule|1': ['Fixed Amount', 'Fixed Percent'],
        platform_clearing_percent: '@integer(10, 20)',
        platform_service_fee: '@integer(100, 500)',
        cumulative_clearing_fee: '@integer(1000, 5000)',
        transaction_time: +Mock.Random.date('T'),
    }))
}

module.exports = [
    {
        url: '/ott/stats/clearing/list',
        type: 'get',
        response: config => {
            const { type, name, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (type && item.type !== type) return false
                return true
            })

            if (sort === '-id') {
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

