if (typeof self !== 'undefined') {
  if (!self.requestIdleCallback) {
    self.requestIdleCallback = (cb: IdleRequestCallback): number => {
      const start = Date.now();
      return self.setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };
  }
  if (!self.requestIdleCallback) {
    self.cancelIdleCallback = id => {
      clearTimeout(id);
    };
  }
}

export type IdleTaskFunction = () => any;
const idleTaskIdProp = Symbol('idleTaskId');
const idleTaskPromiseExecutorProp = Symbol('idleTaskPromiseExecutor');
interface IdleTask extends IdleTaskFunction {
  readonly [idleTaskIdProp]: number;
  readonly [idleTaskPromiseExecutorProp]?: Parameters<
    ConstructorParameters<typeof Promise>[0]
  >;
}

let tasks: IdleTask[] = [];
let requestIdleCallbackId = NaN;

export type ConfigureOptions = {
  readonly interval?: number;
  readonly debug?: boolean;
  readonly timeout?: number;
  readonly cache?: boolean;
};

let taskGlobalOptions: ConfigureOptions = {
  debug: process.env.NODE_ENV === 'development',
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

const runIdleTasks = (deadline: IdleDeadline): void => {
  const timeRemainingDidTimeout = createTimeRemainingDidTimeout(
    deadline.didTimeout
  );
  while (
    (deadline.timeRemaining() > 0 || timeRemainingDidTimeout()) &&
    tasks.length > 0
  ) {
    const task = tasks.shift() as IdleTask;
    const promiseExecutor = task[idleTaskPromiseExecutorProp];
    const executeTask = () => {
      if (!promiseExecutor) {
        return task();
      }
      try {
        promiseExecutor[0](task());
      } catch (e) {
        promiseExecutor[1](e);
      }
    };
    if (taskGlobalOptions.debug) {
      const start = Date.now();
      executeTask();
      const executionTime = Date.now() - start;
      const logArgs = [
        `%cidle-task`,
        `background: #717171; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`,
        `${task.name || 'anonymous'}(${
          task[idleTaskIdProp]
        }) took ${executionTime} ms`,
      ];
      console[executionTime > 50 ? 'warn' : 'info'](...logArgs);
    } else {
      executeTask();
    }
  }
  if (tasks.length > 0) {
    requestIdleCallbackId = requestIdleCallback(runIdleTasks, {
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
  const idleTask = Object.defineProperty(task, idleTaskIdProp, {
    value: idleTaskId,
  }) as IdleTask;
  const isUseCache = options.cache ?? taskGlobalOptions.cache;
  if (isUseCache !== false) {
    idleTaskResultMap.set(
      idleTaskId,
      new Promise((resolve, reject) => {
        Object.defineProperty(task, idleTaskPromiseExecutorProp, {
          value: [resolve, reject],
        });
      })
    );
  }
  options.priority === 'high' ? tasks.unshift(idleTask) : tasks.push(idleTask);
  if (requestIdleCallbackId) {
    return idleTaskId;
  }
  requestIdleCallbackId = requestIdleCallback(runIdleTasks, {
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
  requestIdleCallbackId && cancelIdleCallback(requestIdleCallbackId);
};

// deprecated
export const isRunIdleTask = (id: number): boolean =>
  tasks.findIndex(task => task[idleTaskIdProp] === id) === -1;

export interface WaitForIdleTaskOptions {
  readonly cache?: boolean;
  readonly timeout?: number;
}

const defaultWaitForIdleTaskOptions: WaitForIdleTaskOptions = {
  cache: true,
};

export class WaitForIdleTaskTimeoutError extends Error {
  constructor() {
    super('waitForIdleTask timeout.');
    this.name = 'WaitForIdleTaskTimeoutError';
  }
}

export const waitForIdleTask = async (
  id: number,
  options: WaitForIdleTaskOptions = defaultWaitForIdleTaskOptions
): Promise<any> => {
  const result = idleTaskResultMap.get(id);
  if (options.cache === false) {
    idleTaskResultMap.delete(id);
  }
  const { timeout: globalTimeout } = taskGlobalOptions;
  const { timeout } = options;
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
    throw new WaitForIdleTaskTimeoutError();
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
