/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottTransactionRouter = {
    path: '/ott/transaction',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Transaction',
    meta: {
        title: 'Transaction',
        icon: 'table'
    },
    children: [
        {
            path: 'transaction',
            component: () => import('@/views/ott-transaction/transaction'),
            name: 'Transaction',
            meta: { title: 'Transaction', icon: 'documentation' }
        },
        {
            path: 'clearing',
            component: () => import('@/views/ott-transaction/clearing'),
            name: 'Clearing',
            meta: { title: 'Clearing', icon: 'excel' }
        },
        {
            path: 'clearing/detail/:id',
            component: () => import('@/views/ott-transaction/clearing-detail'),
            hidden: true
        },
        {
            path: 'refund',
            component: () => import('@/views/ott-transaction/refund'),
            name: 'Refund',
            meta: { title: 'Refund', icon: 'list' }
        },
        {
            path: 'settlement',
            component: () => import('@/views/ott-transaction/settlement'),
            name: 'Settlement',
            meta: { title: 'Settlement', icon: 'pdf' }
        },
        {
            path: 'settlement/detail/:id',
            component: () => import('@/views/ott-transaction/settlement-detail'),
            hidden: true
        },
    ]
}

export default ottTransactionRouter
