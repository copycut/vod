import Vue from 'vue'
import Router from 'vue-router'
import scrollBehavior from 'router/scrollBehavior'

Vue.use(Router)

export function createRouter(): Router {
  const router = new Router({
    mode: 'history',
    scrollBehavior: scrollBehavior,
    routes: [
      {
        name: 'home',
        path: '/',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
      },
      {
        name: 'upload',
        path: '/upload',
        component: () =>
          import(/* webpackChunkName: "Upload" */ '../views/Upload'),
      },
      {
        name: 'library',
        path: '/library',
        component: () =>
          import(/* webpackChunkName: "Library" */ '../views/Library'),
      },
    ],
  })

  return router
}
