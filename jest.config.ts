module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageReporters: ['html', 'lcov', 'text'],
  moduleNameMapper: {
    '^@routes': '<rootDir>/src/routes/$1',
    '^@controllers': '<rootDir>/src/controllers/$1',
    '^@constants': '<rootDir>/src/constants/$1',
    '^@utils': '<rootDir>/src/utils/$1',
    '^@validators': '<rootDir>/src/validators/$1',
    '^@middlewares': '<rootDir>/src/middlewares/$1',
  },
};
