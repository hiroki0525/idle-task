module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*\\.test\\.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};
