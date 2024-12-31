import {
  defaultWaitForIdleTaskOptions,
  getResultFromCache,
  idleTaskState as its,
} from '../internals';
import forceRunIdleTask from './forceRunIdleTask';
import type { IdleTaskKey } from './setIdleTask';

type IdleTaskTimeoutStrategy = 'error' | 'forceRun';

export interface WaitForIdleTaskOptions {
  readonly timeout?: number;
  readonly timeoutStrategy?: IdleTaskTimeoutStrategy;
}

export class WaitForIdleTaskTimeoutError extends Error {
  constructor() {
    super('waitForIdleTask timeout.');
    this.name = 'WaitForIdleTaskTimeoutError';
  }
}

const waitForIdleTask = async (
  key: IdleTaskKey,
  options?: WaitForIdleTaskOptions
): Promise<any> => {
  const { timeout: globalTimeout, timeoutStrategy: globalTimeoutStrategy } =
    its.taskGlobalOptions;
  const mergedDefaultOptions = {
    ...defaultWaitForIdleTaskOptions,
    timeout: globalTimeout,
    timeoutStrategy: globalTimeoutStrategy,
  };
  const waitForIdleTaskOptions = options
    ? { ...mergedDefaultOptions, ...options }
    : mergedDefaultOptions;
  const { timeoutStrategy, timeout } = waitForIdleTaskOptions;
  const isForceRun = timeoutStrategy === 'forceRun';
  const result = getResultFromCache(key, !isForceRun);
  if (timeout === undefined && globalTimeout === undefined) {
    return result;
  }
  let isTimeout = false;
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      isTimeout = true;
      resolve(undefined);
    }, timeout ?? globalTimeout);
  });
  const racedResult = await Promise.race([result, timeoutPromise]);
  if (isTimeout) {
    if (isForceRun) {
      return forceRunIdleTask(key);
    }
    throw new WaitForIdleTaskTimeoutError();
  }
  return racedResult;
};

export default waitForIdleTask;
