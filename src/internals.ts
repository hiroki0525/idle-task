import type { WaitForIdleTaskOptions } from './api/waitForIdleTask';
import type { ConfigureOptions } from './api/configureIdleTask';

export const rIC =
  typeof requestIdleCallback !== 'undefined'
    ? requestIdleCallback
    : (cb: IdleRequestCallback): ReturnType<typeof setTimeout> => {
        const start = Date.now();
        return setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          });
        }, 1);
      };

export const cIC =
  typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback : clearTimeout;

export type IdleTaskFunction = () => any;
export const idleTaskIdProp = Symbol('idleTaskId');
export const idleTaskNameProp = Symbol('idleTaskName');
export const idleTaskPromiseExecutorProp = Symbol('idleTaskPromiseExecutor');
export interface IdleTask extends IdleTaskFunction {
  readonly [idleTaskIdProp]: number;
  readonly [idleTaskNameProp]: string;
  readonly [idleTaskPromiseExecutorProp]?: Parameters<
    ConstructorParameters<typeof Promise>[0]
  >;
}

export type ConfigurableWaitForIdleTaskOptions = Pick<
  WaitForIdleTaskOptions,
  'timeout' | 'timeoutStrategy'
>;

export const executeTask = (task: IdleTask): void => {
  const promiseExecutor = task[idleTaskPromiseExecutorProp];
  if (!promiseExecutor) {
    task();
    return;
  }
  try {
    promiseExecutor[0](task());
  } catch (e) {
    promiseExecutor[1](e);
  }
};

export const resolveTaskResultWhenCancel = (task: IdleTask): void => {
  const promiseExecutor = task[idleTaskPromiseExecutorProp];
  promiseExecutor && promiseExecutor[0](undefined);
};

export const getResultFromCache = (id: number, isDeleteCache = false) => {
  const result = idleTaskState.idleTaskResultMap.get(id);
  if (isDeleteCache) {
    idleTaskState.idleTaskResultMap.delete(id);
  }
  return result;
};

export const defaultWaitForIdleTaskOptions: WaitForIdleTaskOptions = {
  cache: true,
  timeoutStrategy: 'error',
};

const taskGlobalOptions: ConfigureOptions = {
  debug: false,
  cache: true,
  timeoutStrategy: 'error',
};

interface IdleTaskState {
  tasks: IdleTask[];
  requestIdleCallbackId: ReturnType<typeof rIC>;
  taskGlobalOptions: ConfigureOptions;
  idleTaskResultMap: Map<number, Promise<any>>;
}

export const idleTaskState: IdleTaskState = {
  tasks: [],
  requestIdleCallbackId: NaN,
  taskGlobalOptions,
  idleTaskResultMap: new Map(),
};
