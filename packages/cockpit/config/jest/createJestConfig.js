module.exports = (resolve, rootDir) => {
  const config = {
    collectCoverageFrom: [
      'lib/**/*.{js}',
    ],
    testEnvironment: 'node',
    testMatch: [
      '<rootDir>/lib/**/?(*.)(spec|test).js?(x)',
    ],
    transform: {
      '^.+\\.(js)$': require.resolve('babel-jest'),
      '^(?!.*\\.(js|mjs|json)$)': resolve('config/jest/fileTransform.js'),
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|mjs)$'],
    moduleFileExtensions: [
      'web.js',
      'js',
      'json',
      'node',
    ],
  }
  if (rootDir) {
    config.rootDir = rootDir
  }

  return config
}
