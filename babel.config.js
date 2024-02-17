module.exports = {
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '^@/assets/(.*)$': './assets/\\1',
          '^@/(.*)$': './src/\\1',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['istanbul'],
    },
  },
}
