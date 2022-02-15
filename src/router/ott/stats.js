/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottStatsRouter = {
    path: '/ott/stats',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Stats',
    meta: {
        title: 'Stats',
        icon: 'dashboard'
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/ott-stats/index'),
            name: 'Stats',
            meta: { title: 'Stats', icon: 'dashboard' }
        }
    ]
}

export default ottStatsRouter
