/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ottMembershipRouter = {
  path: '/ott/membership',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Membership',
  meta: {
    title: 'Membership',
    icon: 'user'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ott-membership/index'),
      name: 'Membership',
      meta: { title: 'Membership', icon: 'user' }
    }
  ]
}

export default ottMembershipRouter
