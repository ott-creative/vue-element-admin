const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        starting_date: +Mock.Random.date('T'),
        ending_date: +Mock.Random.date('T'),
        account_balance: '@integer(100, 500)',
        service_fee: '@integer(100, 500)',
        settlement_amount: '@integer(100, 500)',
        'order_status|1': ['Success', 'Pending', 'Error']
    }))
}

module.exports = [
    {
        url: '/ott/transaction/settlement/list',
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

