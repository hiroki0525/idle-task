import { SetIdleTaskOptions } from '../api/setIdleTask';
import { WaitForIdleTaskOptions } from '../api/waitForIdleTask';
import { idleTaskModule, reloadModule, runRequestIdleCallback } from './util';

describe('getResultFromIdleTask', () => {
  const mockSetIdleTask = jest.fn();
  const mockWaitForIdleTask = jest.fn();
  const setIdleTaskOptions: SetIdleTaskOptions = { priority: 'high' };
  const waitForIdleTaskOptions: WaitForIdleTaskOptions = {
    timeout: 3000,
    timeoutStrategy: 'forceRun',
  };
  let getResultFromIdleTaskPromise: Promise<any>;

  beforeEach(async () => {
    jest.mock('../api/setIdleTask', () => ({
      __esModule: true,
      default: mockSetIdleTask,
    }));
    jest.mock('../api/waitForIdleTask', () => ({
      __esModule: true,
      default: mockWaitForIdleTask,
    }));
    jest.resetModules();
    await reloadModule();
    getResultFromIdleTaskPromise = idleTaskModule!.getResultFromIdleTask(
      () => 'test',
      {
        ...setIdleTaskOptions,
        ...waitForIdleTaskOptions,
      }
    );
    runRequestIdleCallback();
    await getResultFromIdleTaskPromise;
  });

  afterEach(() => {
    mockSetIdleTask.mockReset();
    mockWaitForIdleTask.mockReset();
    jest.unmock('../api/setIdleTask');
    jest.unmock('../api/waitForIdleTask');
  });

  it('setIdleTask calls with options', () => {
    expect(mockSetIdleTask.mock.calls[0][1]).toStrictEqual(setIdleTaskOptions);
  });

  it('waitForIdleTask calls with options', () => {
    expect(mockWaitForIdleTask.mock.calls[0][1]).toStrictEqual({
      ...waitForIdleTaskOptions,
      cache: false,
    });
  });
});
