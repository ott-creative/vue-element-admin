const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        user_account: '@integer(10000000, 99999999)',
        amount: '@integer(100, 500)',
        'type|1': ['Charge', 'Consume'],
        'pay_method|1': ['WeChat', 'Ali', 'Visa', 'Debit Card', 'Master'],
        'refund_amount': 0,
        'status|1': ['Pending', 'Complete', 'Cancel'],
    }))
}

module.exports = [
    {
        url: '/ott/stats/transaction/list',
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

