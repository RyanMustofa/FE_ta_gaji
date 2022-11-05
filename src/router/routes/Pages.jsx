import { lazy } from 'react'

const PagesRoutes = [
  {
    path: '/pages/blank-page',
    component: lazy(() => import('../../view/pages/blank')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/employee',
    component: lazy(() => import('../../view/pages/employee')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/family',
    component: lazy(() => import('../../view/pages/family')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/attendance',
    component: lazy(() => import('../../view/pages/attendance')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/position',
    component: lazy(() => import('../../view/pages/position')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/set-component',
    component: lazy(() => import('../../view/pages/position/setupComponent')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/user',
    component: lazy(() => import('../../view/pages/pengguna')),
    layout: 'VerticalLayout',
  },
  {
    path: '/pages/error-page',
    component: lazy(() => import('../../view/pages/error')),
    layout: 'FullLayout',
  },
  {
    path: '/login',
    component: lazy(() => import('../../view/authentication/login')),
    layout: 'FullLayout',
  },
  {
    path: '/register',
    component: lazy(() => import('../../view/authentication/register')),
    layout: 'FullLayout',
  },
]

export default PagesRoutes
