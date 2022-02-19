const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        name: i == 0 ? "John Smith" : '@name',
        account: '@integer(10000000, 99999999)',
        'member_type|1': ['Regular', 'Honor'],
        did: "did:key:0djd2838484jcuieru4823nd83",
        balance: '@integer(100, 5000)',
        points: '@integer(10000, 500000)',
        'status|1': ['Yes', 'No'],
        membership_start: +Mock.Random.date('T'),
        membership_end: +Mock.Random.date('T'),
        salesman: '@first'
    }))
}

module.exports = [
    {
        url: '/ott/membership/list',
        type: 'get',
        response: config => {
            const { type, name, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (type && item.type !== type) return false
                if (name && item.name.indexOf(name) < 0) return false
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
    {
        url: '/ott/membership/detail',
        type: 'get',
        response: config => {
            const { id } = config.query

            let result = undefined;
            for (const item of List) {
                console.log(item);
                if (item.id == id) {
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
        url: '/ott/membership/create',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    {
        url: '/ott/membership/update',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]

