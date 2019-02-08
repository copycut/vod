import {createApp} from 'app'
import {HTTPErrorNotFound} from 'libs/HTTPErrors'
import {VueContext} from 'types/VueContext'

export default async (context: VueContext) => {
  const {app, router} = await createApp()

  // Register router handlers
  const routerPromise = new Promise((resolve, reject) => {
    router.onError(reject)
    router.onReady(resolve)
  })

  const url = context.url

  router.push(url)

  await routerPromise

  const matchedComponents = router.getMatchedComponents()
  if (!matchedComponents.length) {
    throw new HTTPErrorNotFound(`No route matched for ${url}`)
  }

  return app
}
