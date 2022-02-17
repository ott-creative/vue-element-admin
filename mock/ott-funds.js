const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        order_id: '@increment',
        'business_type|1': ['Receipt', 'Disbursement'],
        amount: '@integer(100, 5000)',
        balance: '@integer(10000, 500000)',
        time: +Mock.Random.date('T')
    }))
}

module.exports = [
    {
        url: '/ott/funds/list',
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
        url: '/ott/funds/summary',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: {
                    balance: 10929,
                    receipts: 28283,
                    disbursements: 283,
                }
            }
        }
    }
]

