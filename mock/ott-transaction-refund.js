const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        order_id: '@increment',
        transaction_amount: '@integer(100, 500)',
        refund_amount: '@integer(100, 500)',
        'type|1': ['Partial', 'Full'],
        'payment_method|1': ['WeChat', 'Ali', 'Visa'],
        'status|1': ['Success', 'Pending', 'Error'],
        'transaction_status|1': ['Success', 'Pending', 'Error'],
        time: +Mock.Random.date('T')
    }))
}

module.exports = [
    {
        url: '/ott/transaction/refund/list',
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

