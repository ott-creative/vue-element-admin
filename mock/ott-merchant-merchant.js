const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        name: '@first',
        'merchant_type|1': ['Individual', 'Corporate'],
        'business_license_name|1': ['BUN--01', 'BUN--02'],
        business_license_no: '@integer(100000000, 999999999)',
        legal_person_did: 'did:key:0djd2838484jcuieru4823nd83',
        'status|1': ['Valid', 'Invalid'],
    }))
}

module.exports = [
    {
        url: '/ott/merchant/merchant/list',
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

