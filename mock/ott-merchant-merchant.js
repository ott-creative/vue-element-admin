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
        qr_pay: "paycode",
        address: "",
        email: "",
        business_license_type: "",
        business_license_expired: "",

        // Account
        account_bank_name: "",
        account_branch_no: "",
        account_branch_address: "",
        account_bank_no: "",
        account_routing_no: "",
        account_swift_code: "",
        account_bank_holder_name: "",
        account_bank_holder_address: "",

        // platform service setting:
        platform_service_fee_percentage: "2%",
    }))
}

module.exports = [
    {
        url: '/ott/merchant/merchant/list',
        type: 'get',
        response: config => {
            const { merchant_type, name, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (merchant_type && item.merchant_type !== merchant_type) return false
                if (name && item.name !== name) return false
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
        url: '/ott/merchant/merchant/detail',
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
        url: '/ott/merchant/merchant/create',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    {
        url: '/ott/merchant/merchant/update',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
]

