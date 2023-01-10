import {
  defaultWaitForIdleTaskOptions,
  getResultFromCache,
  idleTaskState as its,
} from '../internals';
import forceRunIdleTask from './forceRunIdleTask';

type IdleTaskTimeoutStrategy = 'error' | 'forceRun';

export interface WaitForIdleTaskOptions {
  readonly cache?: boolean;
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
  id: number,
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
  const isDeleteCache =
    timeoutStrategy !== 'forceRun' && waitForIdleTaskOptions.cache === false;
  const result = getResultFromCache(id, isDeleteCache);
  if (timeout === undefined && globalTimeout === undefined) {
    return result;
  }
  let isTimeout = false;
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve((isTimeout = true));
    }, timeout ?? globalTimeout);
  });
  const racedResult = await Promise.race([result, timeoutPromise]);
  if (isTimeout) {
    if (waitForIdleTaskOptions.timeoutStrategy === 'forceRun') {
      return forceRunIdleTask(id);
    } else {
      throw new WaitForIdleTaskTimeoutError();
    }
  }
  return racedResult;
};

export default waitForIdleTask;
