module.exports = () => ({
  plugins: {
    'postcss-easy-import': {
      path: ['src'],
      extensions: ['.scss', '.css'],
    },
    'postcss-simple-vars': {},
    'postcss-calc': {
      mediaQueries: true,
    },
    'postcss-each': {},
    'autoprefixer': {},
    'postcss-nested': {},
    'postcss-autoreset': {
      reset: {
        boxSizing: 'border-box',
      },
    },
    'cssnano': {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
    'postcss-reporter': {
      clearMessages: true,
      throwError: true,
    },
  },
})
