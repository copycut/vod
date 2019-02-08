import Vue from 'vue'
import VueTSX from '@hexeo/vue-typescript-jsx'
import VueRouter from 'vue-router'

import {createRouter} from 'router'
import Root from 'views/Root'
import styleInjectMixin from 'mixins/styleInject'
import {props} from 'router/hooks/Root'

Vue.use(VueTSX)
Vue.mixin(styleInjectMixin)

export async function createApp(): Promise<{
  app: Vue
  router: VueRouter
}> {
  const router = createRouter()

  const app = new Vue({
    router: router,
    render: function(h) {
      return h(Root, {props: props(this.$route)})
    },
  })

  return {app, router}
}
