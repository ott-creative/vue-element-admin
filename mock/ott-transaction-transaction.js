const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        amount: '@integer(100, 500)',
        redeem_points: '@integer(100, 500)',
        'type|1': ['Charge', 'Consume'],
        refund_amount: 0,
        return_points: '@integer(100, 500)',
        'clearing_status|1': ['Success', 'Pending', 'Error'],
        'status|1': ['Success', 'Pending', 'Error'],
        time: +Mock.Random.date('T')
    }))
}

module.exports = [
    {
        url: '/ott/transaction/transaction/list',
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

