import {
  mockCancelIdleCallback,
  mockRequestIdleCallback,
  reloadModule,
} from './util';

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(async () => {
  global.requestIdleCallback = mockRequestIdleCallback;
  global.cancelIdleCallback = mockCancelIdleCallback;
  await reloadModule();
});

afterAll(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.resetModules();
});
