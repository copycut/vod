import config from 'config'
import {createApp} from 'app'

function checkUpdate(): boolean {
  if (
    typeof config.version === 'string' &&
    typeof process.env.BUILD_NUMBER === 'string'
  ) {
    if (config.version !== process.env.BUILD_NUMBER) {
      return true
    }
  }
  return false
}

function loadPolyfills(callback: Function): void {
  const script = window.document.createElement('script')
  script.src =
    'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes,Map,WeakMap,fetch,IntersectionObserver,Intl,Intl.~locale.en,String.prototype.padStart,String.prototype.startsWith,Object.values,Object.assign,Object.entries,Element.prototype.classList&flags=always,gated'
  script.async = true

  script.onload = function() {
    callback()
  }

  const head =
    window.document.head || window.document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

async function initApp(): Promise<void> {
  if (checkUpdate() === true) {
    window.location.reload(true)
    return
  }

  const {app, router} = await createApp()

  router.onError((error: any) => {
    if (error.status === 404) {
      router.push('/404')
    }
  })

  router.onReady(() => {
    app.$mount('#app')
  })
}

loadPolyfills(() => {
  initApp().catch((error) => console.error(error))
})
