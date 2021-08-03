process.env.JEST_PLAYWRIGHT_CONFIG = './test/e2e/jest-playwright.config.js';

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
  rootDir: '../..',
  roots: ['./test/e2e', './src'],
  preset: 'jest-playwright-preset',
  testMatch: ['**/test/**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/dist/', '/example/', '/node_modules/'],
  testTimeout: 200000,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/build/', '/dist/', '/docs/', '/example/', '/node_modules/', '/test/'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'build/test-report/e2e',
  // setupFiles: ['./test/e2e/config/copy.bpmn.diagram.ts'],
  setupFilesAfterEnv: ['./test/e2e/config/jest.image.ts', './test/e2e/config/playwright.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'ImageSketchpad E2E Test Report',
        outputPath: 'build/test-report/e2e/index.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],
  verbose: true,
};
