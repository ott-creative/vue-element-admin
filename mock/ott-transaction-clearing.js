const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        order_id: '@increment',
        transaction_amount: '@integer(100, 5000)',
        refund_amount: '@integer(10, 20)',
        'transaction_type|1': ['Charge', 'Consume'],
        clearing_amount: '@integer(100, 5000)',
        merchant_name: '@first',
        merchant_clearing_fee: '@integer(100, 5000)',
        platform_service_fee: '@integer(100, 5000)',
        receivable_amount: '@integer(100, 5000)',
        'clearing_status|1': ['Success', 'Pending', 'Error'],
        transaction_time: +Mock.Random.date('T')
    }))
}

module.exports = [
    {
        url: '/ott/transaction/clearing/list',
        type: 'get',
        response: config => {
            const { type, name, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (type && item.type !== type) return false
                return true
            })

            if (sort === '-order_id') {
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

    {
        url: '/ott/transaction/clearing/summary',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: {
                    transaction_amount: 18345,
                    refund_amount: 10,
                    clearing_amount: 200,
                    platform_service_amount: 50,
                }
            }
        }
    }
]

