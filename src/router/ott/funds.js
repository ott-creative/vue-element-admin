/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottFundsRouter = {
    path: '/ott/funds',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Funds Management',
    meta: {
        title: 'Funds',
        icon: 'chart'
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/ott-funds/index'),
            name: 'Funds',
            meta: { title: 'Funds', icon: 'chart' }
        }
    ]
}

export default ottFundsRouter
