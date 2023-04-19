import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],

  rootDir: '.',
  modulePaths: ['.'],

  testRegex: 'test/unit/.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/unit/setup.ts'],

  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '.module.ts',
    '<rootDir>/src/config',
    '<rootDir>/src/main.ts',
    'pino-logger.config',
    'logger.interceptor.ts',
    'api/sample',
  ],
  coverageReporters: ['json', 'lcov', 'text', ['text', { file: 'summary.txt' }]],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
