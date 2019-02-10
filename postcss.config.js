module.exports = () => ({
  plugins: {
    'postcss-prepend-imports': {
      path: 'src/styles',
      files: ['variables.scss'],
    },
    'postcss-easy-import': {
      path: ['src'],
      extensions: ['.scss'],
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
