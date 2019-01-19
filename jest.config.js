module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'lib/**/*.{js}'
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    {
      displayName: 'Default'
    },
    {
      displayName: 'ESLint',
      runner: 'jest-runner-eslint',
      testMatch: [
        '<rootDir>/lib/**/*.js',
        '<rootDir>/test/**/*.js'
      ]
    }
  ]
}
