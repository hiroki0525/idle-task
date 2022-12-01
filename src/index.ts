const rIC =
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

const cIC =
  typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback : clearTimeout;

export type IdleTaskFunction = () => any;
const idleTaskIdProp = Symbol('idleTaskId');
const idleTaskNameProp = Symbol('idleTaskName');
const idleTaskPromiseExecutorProp = Symbol('idleTaskPromiseExecutor');
interface IdleTask extends IdleTaskFunction {
  readonly [idleTaskIdProp]: number;
  readonly [idleTaskNameProp]: string;
  readonly [idleTaskPromiseExecutorProp]?: Parameters<
    ConstructorParameters<typeof Promise>[0]
  >;
}

let tasks: IdleTask[] = [];
let requestIdleCallbackId: ReturnType<typeof rIC>;

export type ConfigureOptions = {
  readonly interval?: number;
  readonly debug?: boolean;
  readonly timeout?: number;
  readonly cache?: boolean;
};

let taskGlobalOptions: ConfigureOptions = {
  debug: false,
  cache: true,
};

export const configureIdleTask = (options: ConfigureOptions): void => {
  taskGlobalOptions = options;
};

const createTimeRemainingDidTimeout = (
  didTimeout: boolean
): (() => boolean) => {
  const start = Date.now();
  return () => didTimeout && Date.now() - start < 50;
};

const idleTaskResultMap = new Map<number, Promise<any>>();

const executeTask = (task: IdleTask): void => {
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

const runIdleTasks = (deadline: IdleDeadline): void => {
  const timeRemainingDidTimeout = createTimeRemainingDidTimeout(
    deadline.didTimeout
  );
  while (
    (deadline.timeRemaining() > 0 || timeRemainingDidTimeout()) &&
    tasks.length > 0
  ) {
    const task = tasks.shift() as IdleTask;
    if (taskGlobalOptions.debug && typeof self !== 'undefined') {
      const start = performance.now();
      executeTask(task);
      const executionTime = Math.ceil((performance.now() - start) * 100) / 100;
      console[executionTime > 50 ? 'warn' : 'info'](
        `%cidle-task`,
        `background: #717171; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`,
        `${task[idleTaskNameProp] || 'anonymous'}(${
          task[idleTaskIdProp]
        }) took ${executionTime} ms`
      );
    } else {
      executeTask(task);
    }
  }
  if (tasks.length > 0) {
    requestIdleCallbackId = rIC(runIdleTasks, {
      timeout: taskGlobalOptions.interval,
    });
    return;
  }
  requestIdleCallbackId = NaN;
};

export interface SetIdleTaskOptions {
  readonly priority?: 'low' | 'high';
  readonly cache?: boolean;
}
let id = 0;
const defaultSetIdleTaskOptions: SetIdleTaskOptions = {
  priority: 'low',
};

export const setIdleTask = (
  task: IdleTaskFunction,
  options: SetIdleTaskOptions = defaultSetIdleTaskOptions
): number => {
  const idleTaskId = ++id;
  const idleTask = Object.defineProperties(() => task(), {
    [idleTaskIdProp]: {
      value: idleTaskId,
    },
    [idleTaskNameProp]: {
      value: task.name,
    },
  }) as IdleTask;
  const isUseCache = options.cache ?? taskGlobalOptions.cache;
  if (isUseCache !== false) {
    idleTaskResultMap.set(
      idleTaskId,
      new Promise((resolve, reject) => {
        Object.defineProperty(idleTask, idleTaskPromiseExecutorProp, {
          value: [resolve, reject],
        });
      })
    );
  }
  options.priority === 'high' ? tasks.unshift(idleTask) : tasks.push(idleTask);
  if (requestIdleCallbackId) {
    return idleTaskId;
  }
  requestIdleCallbackId = rIC(runIdleTasks, {
    timeout: taskGlobalOptions.interval,
  });
  return idleTaskId;
};

const resolveTaskResultWhenCancel = (task: IdleTask): void => {
  const promiseExecutor = task[idleTaskPromiseExecutorProp];
  promiseExecutor && promiseExecutor[0](undefined);
};

export const cancelIdleTask = (id: number): void => {
  const task = tasks.find(task => task[idleTaskIdProp] === id);
  task && resolveTaskResultWhenCancel(task);
  idleTaskResultMap.delete(id);
  tasks = tasks.filter(task => task[idleTaskIdProp] !== id);
};

export const cancelAllIdleTasks = (): void => {
  tasks.forEach(resolveTaskResultWhenCancel);
  tasks.length = 0;
  idleTaskResultMap.clear();
  requestIdleCallbackId && cIC(requestIdleCallbackId as any); // TypeScript Error because requestIdleCallbackId is number | NodeJS.Timeout.
};

// deprecated
export const isRunIdleTask = (id: number): boolean =>
  tasks.findIndex(task => task[idleTaskIdProp] === id) === -1;

export type IdleTaskTimeoutStrategy = 'error' | 'forceRun';

export interface WaitForIdleTaskOptions {
  readonly cache?: boolean;
  readonly timeout?: number;
  readonly timeoutStrategy?: IdleTaskTimeoutStrategy;
}

const defaultWaitForIdleTaskOptions: WaitForIdleTaskOptions = {
  cache: true,
  timeoutStrategy: 'error',
};

export class WaitForIdleTaskTimeoutError extends Error {
  constructor() {
    super('waitForIdleTask timeout.');
    this.name = 'WaitForIdleTaskTimeoutError';
  }
}

const getResultFromCache = (id: number, isDeleteCache = false) => {
  const result = idleTaskResultMap.get(id);
  if (isDeleteCache) {
    idleTaskResultMap.delete(id);
  }
  return result;
};

export const waitForIdleTask = async (
  id: number,
  options?: WaitForIdleTaskOptions
): Promise<any> => {
  const waitForIdleTaskOptions = options
    ? { ...defaultWaitForIdleTaskOptions, ...options }
    : defaultWaitForIdleTaskOptions;
  const result = getResultFromCache(id, waitForIdleTaskOptions.cache === false);
  const { timeout: globalTimeout } = taskGlobalOptions;
  const { timeout } = waitForIdleTaskOptions;
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

export type GetResultFromIdleTaskOptions = Pick<
  SetIdleTaskOptions,
  'priority'
> &
  Pick<WaitForIdleTaskOptions, 'timeout'>;

export const getResultFromIdleTask = (
  task: IdleTaskFunction,
  options?: GetResultFromIdleTaskOptions
): ReturnType<typeof waitForIdleTask> =>
  waitForIdleTask(setIdleTask(task, { priority: options?.priority }), {
    cache: false,
    timeout: options?.timeout,
  });

type ForceRunIdleTaskOptions = Pick<WaitForIdleTaskOptions, 'cache'>;

const defaultForceRunIdleTaskOptions = defaultWaitForIdleTaskOptions;

export const forceRunIdleTask = async (
  id: number,
  options: ForceRunIdleTaskOptions = defaultForceRunIdleTaskOptions
): Promise<any> => {
  if (isRunIdleTask(id)) {
    return getResultFromCache(id, options.cache === false);
  }
  const task = tasks.find(task => task[idleTaskIdProp] === id) as IdleTask;
  executeTask(task);
  const result = getResultFromCache(id, options.cache === false);
  tasks = tasks.filter(task => task[idleTaskIdProp] !== id);
  return result;
};
