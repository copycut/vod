import fs from 'fs'
import path from 'path'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import {createBundleRenderer} from 'vue-server-renderer'
import clientConfig from './config/client'
import {VueContext} from 'types/VueContext'

process.env.TZ = 'UTC'

const app = express()

const renderer = createBundleRenderer(
  JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../dist/vue-ssr-server-bundle.json'),
      {
        encoding: 'utf8',
      }
    )
  ),
  {
    runInNewContext: 'once',
    template: fs.readFileSync(path.join(__dirname, 'views/index.html'), {
      encoding: 'utf8',
    }),
    clientManifest: JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../dist/vue-ssr-client-manifest.json'),
        {
          encoding: 'utf8',
        }
      )
    ),
  }
)

app.set('json spaces', 2)
app.set('x-powered-by', false)
app.set('trust proxy', true)
app.use(cookieParser())
app.use(compression())

app.use(
  `/${process.env.BUILD_NUMBER}/assets`,
  express.static(path.join(__dirname, '/../dist/assets'))
)
app.use(express.static(path.join(__dirname, '/favicons')))

app.get('*', async (req, res) => {
  try {
    const context: VueContext = {
      clientConfig: clientConfig,
      url: req.url,
      title: 'vod',
    }
    const html = await renderer.renderToString(context)
    return res.send(html)
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).send('Page not found')
    }
    console.error(error)
    return res.status(error.status || 500).json(error)
  }
})

app.listen(3002, '0.0.0.0', () => {
  console.log('server-started')
})
