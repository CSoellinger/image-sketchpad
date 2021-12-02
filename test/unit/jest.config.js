const path = require('path');

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
  rootDir: '../..',
  roots: ['./test/unit', './src'],
  testMatch: ['**/test/**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/build/', '/dist/', '/docs/', '/example/', '/node_modules/'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testLocationInResults: true,
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/build/', '/dist/', '/docs/', '/example/', '/node_modules/', '/test/'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'build/test-report/unit',
  setupFiles: ['jest-canvas-mock', './test/unit/setupPointerEvent.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'ImageSketchpad Unit Test Report',
        outputPath: 'build/test-report/unit/index.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, '..', 'tsconfig.ts'),
    },
  },
  verbose: true,
};
