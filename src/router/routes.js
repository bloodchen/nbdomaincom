
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue') },
      { path: 'search', component: () => import('src/pages/SearchDomain.vue') },
      { path: 'free', component: () => import('src/pages/FreeDomain.vue') },
      { path: 'play', component: () => import('src/pages/PlayGround.vue') },
      { path: 'detail', component: () => import('src/pages/SetDetail.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
