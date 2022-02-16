/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottStatsRouter = {
    path: '/ott/stats',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Stats',
    meta: {
        title: 'Stats',
        icon: 'tab'
    },
    children: [
        {
            path: 'transaction',
            component: () => import('@/views/ott-stats/transaction'),
            name: 'Transaction',
            meta: { title: 'Transaction', icon: 'tab' }
        },
        {
            path: 'transaction-detail',
            component: () => import('@/views/ott-stats/transaction-detail'),
            name: 'Transaction Detail',
            meta: { title: 'Transaction Detail', icon: 'tab' }
        },
        {
            path: 'clearing',
            component: () => import('@/views/ott-stats/clearing'),
            name: 'Clearing',
            meta: { title: 'Clearing', icon: 'tab' }
        },
        {
            path: 'membership-consume',
            component: () => import('@/views/ott-stats/membership-consume'),
            name: 'Membership Consume',
            meta: { title: 'Membership Consume', icon: 'tab' }
        },
    ]
}

export default ottStatsRouter
