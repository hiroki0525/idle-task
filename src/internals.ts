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

type PromiseResolveReject = Parameters<
  ConstructorParameters<typeof Promise>[0]
>;

export interface IdleTask extends IdleTaskFunction {
  readonly id: number;
  readonly name: string;
  readonly resolve?: PromiseResolveReject[0];
  readonly reject?: PromiseResolveReject[1];
  readonly revalidateWhenExecuted?: boolean;
}

export type ConfigurableWaitForIdleTaskOptions = Pick<
  WaitForIdleTaskOptions,
  'timeout' | 'timeoutStrategy'
>;

export const executeTask = (task: IdleTask): void => {
  const { resolve, reject, revalidateWhenExecuted } = task;
  const reregisterIdleTask = () =>
    revalidateWhenExecuted && idleTaskState.tasks.push(task);
  if (!resolve || !reject) {
    task();
    reregisterIdleTask();
    return;
  }
  try {
    resolve(task());
  } catch (e) {
    reject(e);
  } finally {
    reregisterIdleTask();
  }
};

export const resolveTaskResultWhenCancel = (tasks: IdleTask[]): void => {
  tasks.forEach(task => {
    task.resolve && task.resolve(undefined);
  });
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
} as const;

const taskGlobalOptions: ConfigureOptions = {
  debug: false,
  cache: true,
  timeoutStrategy: 'error',
} as const;

interface IdleTaskState {
  tasks: IdleTask[];
  requestIdleCallbackId: ReturnType<typeof rIC>;
  taskGlobalOptions: ConfigureOptions;
  idleTaskResultMap: Map<number, Promise<any>>;
  idleTaskRevalidateIntervalMap: Map<number, ReturnType<typeof setInterval>>;
}

export const idleTaskState: IdleTaskState = {
  tasks: [],
  requestIdleCallbackId: NaN,
  taskGlobalOptions,
  idleTaskResultMap: new Map(),
  idleTaskRevalidateIntervalMap: new Map(),
};
