/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottDashboardRouter = {
  path: '/ott/dashboard',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ott-dashboard/index'),
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }
  ]
}

export default ottDashboardRouter
