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
      },
    ],
  })

  return router
}
