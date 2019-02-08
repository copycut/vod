import {Route} from 'vue-router'

export interface Props {
  routePath: string
  isTouchDevice: boolean
}

export function props(route: Route): Props {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    'ontouchstart' in
      (window.document.documentElement ||
        window.document.getElementsByTagName('html')[0])

  return {
    routePath: route.path,
    isTouchDevice: isTouchDevice,
  }
}
