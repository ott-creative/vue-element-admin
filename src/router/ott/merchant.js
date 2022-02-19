/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottMerchantRouter = {
    path: '/ott/merchant',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Merchant',
    meta: {
        title: 'Merchant',
        icon: 'drag'
    },
    children: [
        {
            path: 'merchant',
            component: () => import('@/views/ott-merchant/merchant'),
            name: 'Merchant',
            meta: { title: 'Merchant List', icon: 'component' }
        },
        {
            path: 'detail/:id',
            component: () => import('@/views/ott-merchant/detail'),
            hidden: true
        },
        {
            path: 'setting',
            component: () => import('@/views/ott-merchant/setting-list'),
            name: 'Setting',
            meta: { title: 'Merchant Setting', icon: 'skill' }
        }
    ]
}

export default ottMerchantRouter
