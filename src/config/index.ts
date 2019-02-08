let config: any = null
if (process.env.VUE_ENV === 'server') {
  config = require('./server').default
} else if (process.env.VUE_ENV === 'client') {
  config = window.clientConfig
}

export default config
