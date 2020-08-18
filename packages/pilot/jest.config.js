module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/stories/**',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '.+\\.(png|jpg|gif)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
}
