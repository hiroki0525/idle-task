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
  readonly [idleTaskPromiseExecutorProp]: any;
}

let tasks: IdleTask[] = [];
let requestIdleCallbackId = NaN;

export type ConfigureOptions = {
  readonly interval?: number;
  readonly debug?: boolean;
};

let taskGlobalOptions: ConfigureOptions = {
  debug: process.env.NODE_ENV === 'development',
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
    const [resolve, reject] = task[idleTaskPromiseExecutorProp];
    if (taskGlobalOptions.debug) {
      const start = Date.now();
      try {
        resolve(task());
      } catch (e) {
        reject(e);
      }
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
      try {
        resolve(task());
      } catch (e) {
        reject(e);
      }
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
  readonly priority: 'low' | 'high';
}
let id = 0;
const defaultSetIdleTaskOptions: SetIdleTaskOptions = { priority: 'low' };

export const setIdleTask = (
  task: VoidFunction,
  options: SetIdleTaskOptions = defaultSetIdleTaskOptions
): number => {
  const idleTaskId = ++id;
  const idleTask = Object.defineProperty(task, idleTaskIdProp, {
    value: idleTaskId,
  }) as IdleTask;
  idleTaskResultMap.set(
    idleTaskId,
    new Promise((resolve, reject) => {
      Object.defineProperty(task, idleTaskPromiseExecutorProp, {
        value: [resolve, reject],
      });
    })
  );
  options.priority === 'low' ? tasks.push(idleTask) : tasks.unshift(idleTask);
  if (requestIdleCallbackId) {
    return idleTaskId;
  }
  requestIdleCallbackId = requestIdleCallback(runIdleTasks, {
    timeout: taskGlobalOptions.interval,
  });
  return idleTaskId;
};

export const cancelIdleTask = (id: number): void => {
  idleTaskResultMap.delete(id);
  tasks = tasks.filter(task => task[idleTaskIdProp] !== id);
};

export const cancelAllIdleTasks = (): void => {
  tasks.length = 0;
  idleTaskResultMap.clear();
  requestIdleCallbackId && cancelIdleCallback(requestIdleCallbackId);
};

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
  if (!options.cache) {
    idleTaskResultMap.delete(id);
  }
  const { timeout } = options;
  if (timeout === undefined) {
    return result;
  }
  let isTimeout = false;
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve((isTimeout = true));
    }, timeout);
  });
  const racedResult = await Promise.race([result, timeoutPromise]);
  if (isTimeout) {
    throw new WaitForIdleTaskTimeoutError();
  }
  return racedResult;
};