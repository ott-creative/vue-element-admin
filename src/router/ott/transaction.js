/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottTransactionRouter = {
    path: '/ott/transaction',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Transaction',
    meta: {
        title: 'Transaction',
        icon: 'tab'
    },
    children: [
        {
            path: 'transaction',
            component: () => import('@/views/ott-transaction/transaction'),
            name: 'Transaction',
            meta: { title: 'Transaction', icon: 'tab' }
        },
        {
            path: 'clearing',
            component: () => import('@/views/ott-transaction/clearing'),
            name: 'Clearing',
            meta: { title: 'Clearing', icon: 'tab' }
        },
        {
            path: 'refund',
            component: () => import('@/views/ott-transaction/refund'),
            name: 'Refund',
            meta: { title: 'Refund', icon: 'tab' }
        },
        {
            path: 'settlement',
            component: () => import('@/views/ott-transaction/settlement'),
            name: 'Settlement',
            meta: { title: 'Settlement', icon: 'tab' }
        },
    ]
}

export default ottTransactionRouter
