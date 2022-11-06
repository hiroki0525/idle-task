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

export type VoidFunction = () => void | Promise<void>;
const idleTaskIdProp = Symbol('idleTaskId');
interface IdleTask extends VoidFunction {
  readonly [idleTaskIdProp]: number;
}

let tasks: IdleTask[] = [];
let requestIdleCallbackId = NaN;

export type ConfigureOptions = {
  readonly interval?: number;
};

let taskGlobalOptions: ConfigureOptions | undefined;

export const configureIdleTask = (options: ConfigureOptions): void => {
  taskGlobalOptions = options;
};

const createTimeRemainingDidTimeout = (
  didTimeout: boolean
): (() => boolean) => {
  const start = Date.now();
  return () => didTimeout && Date.now() - start < 50;
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
    task();
  }
  if (tasks.length > 0) {
    requestIdleCallbackId = requestIdleCallback(runIdleTasks, {
      timeout: taskGlobalOptions?.interval,
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
  options.priority === 'low' ? tasks.push(idleTask) : tasks.unshift(idleTask);
  if (requestIdleCallbackId) {
    return idleTaskId;
  }
  requestIdleCallbackId = requestIdleCallback(runIdleTasks, {
    timeout: taskGlobalOptions?.interval,
  });
  return idleTaskId;
};

export const cancelIdleTask = (id: number): void => {
  tasks = tasks.filter(task => task[idleTaskIdProp] !== id);
};

export const cancelAllIdleTasks = (): void => {
  tasks.length = 0;
  requestIdleCallbackId && cancelIdleCallback(requestIdleCallbackId);
};

export const isRunIdleTask = (id: number): boolean =>
  tasks.findIndex(task => task[idleTaskIdProp] === id) === -1;
