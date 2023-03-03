import { ConfigureOptions } from '../api/configureIdleTask';
import {
  createTask,
  idleTaskModule,
  mockRequestIdleCallback,
  runRequestIdleCallback,
} from './util';

describe('configureIdleTask', () => {
  let mockConfigureIdleTask: jest.SpyInstance;

  beforeEach(() => {
    mockConfigureIdleTask = jest.spyOn(
      idleTaskModule as any,
      'configureIdleTask'
    );
  });

  afterEach(() => {
    mockConfigureIdleTask.mockReset();
  });

  describe('not called configure', () => {
    beforeEach(() => {
      idleTaskModule!.setIdleTask(createTask());
      runRequestIdleCallback();
    });

    it('requestIdleCallback called without option', () => {
      expect(mockRequestIdleCallback.mock.calls[0][1]).toStrictEqual({
        timeout: undefined,
      });
    });

    it('not called configureIdleTask', () => {
      expect(mockConfigureIdleTask).not.toHaveBeenCalled();
    });
  });

  describe('called configure', () => {
    const expected: ConfigureOptions = {
      interval: 1000,
      debug: false,
      timeout: 3000,
    };

    beforeEach(() => {
      idleTaskModule!.configureIdleTask(expected);
      idleTaskModule!.setIdleTask(createTask());
      runRequestIdleCallback();
    });

    it('requestIdleCallback called with option', () => {
      expect(mockRequestIdleCallback.mock.calls[0][1]).toStrictEqual({
        timeout: expected.interval,
      });
    });

    it('called configureIdleTask with options', () => {
      expect(mockConfigureIdleTask).toHaveBeenCalledWith(expected);
    });
  });
});
