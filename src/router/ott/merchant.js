/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottMerchantRouter = {
    path: '/ott/merchant',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Merchant',
    meta: {
        title: 'Merchant',
        icon: 'tab'
    },
    children: [
        {
            path: 'merchant',
            component: () => import('@/views/ott-merchant/merchant'),
            name: 'Merchant',
            meta: { title: 'Merchant List', icon: 'tab' }
        },
        {
            path: 'setting',
            component: () => import('@/views/ott-merchant/setting-list'),
            name: 'Setting',
            meta: { title: 'Merchant Setting', icon: 'tab' }
        }
    ]
}

export default ottMerchantRouter
