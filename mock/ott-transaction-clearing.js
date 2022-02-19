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
        transaction_time: +Mock.Random.date('T'),
        clearing_start_time: +Mock.Random.date('T'),
        clearing_end_time: +Mock.Random.date('T'),
        clearing_club_receiver_id: 123,
        clearing_merchant_receiver_id: 124,
        clearing_club_receiver_name: "Golf Club",
        clearing_merchant_receiver_name: "Golf Merchant",
        clearing_platform_receiver_id: 125,
        clearing_platform_receiver_name: "Platform",
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
        url: '/ott/transaction/clearing/detail',
        type: 'get',
        response: config => {
            const { id } = config.query

            let result = undefined;
            for (const item of List) {
                console.log(item);
                if (item.order_id == id) {
                    return {
                        code: 20000,
                        data: item
                    }
                }
            }

            console.log("result:", result);

            return {
                code: 30000,
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

