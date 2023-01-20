import {
  IdleTask,
  IdleTaskFunction,
  rIC,
  executeTask,
  idleTaskState as its,
} from '../internals';

export interface SetIdleTaskOptions {
  readonly priority?: 'low' | 'high';
  readonly cache?: boolean;
  readonly revalidateInterval?: number;
  readonly revalidateWhenExecuted?: boolean;
}

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
    its.tasks.length > 0
  ) {
    const task = its.tasks.shift() as IdleTask;
    if (its.taskGlobalOptions.debug && typeof self !== 'undefined') {
      const start = performance.now();
      executeTask(task);
      const executionTime = Math.ceil((performance.now() - start) * 100) / 100;
      console[executionTime > 50 ? 'warn' : 'info'](
        `%cidle-task`,
        `background:#717171;color:white;padding:2px 3px;border-radius:2px;font-size:0.8em;`,
        `${task.name || 'anonymous'}(${task.id}) took ${executionTime} ms`
      );
    } else {
      executeTask(task);
    }
  }
  if (its.tasks.length > 0) {
    its.requestIdleCallbackId = rIC(runIdleTasks, {
      timeout: its.taskGlobalOptions.interval,
    });
    return;
  }
  its.requestIdleCallbackId = NaN;
};

let id = 0;
const defaultSetIdleTaskOptions: SetIdleTaskOptions = {
  priority: 'low',
  revalidateWhenExecuted: false,
} as const;

const setIdleTask = (
  task: IdleTaskFunction,
  options: SetIdleTaskOptions = defaultSetIdleTaskOptions
): number => {
  const idleTaskId = ++id;
  let resolve, reject;
  const isUseCache = options.cache ?? its.taskGlobalOptions.cache;
  if (isUseCache !== false) {
    its.idleTaskResultMap.set(
      idleTaskId,
      new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      })
    );
  }
  const idleTask = Object.defineProperties(() => task(), {
    id: {
      value: idleTaskId,
    },
    name: {
      value: task.name,
    },
    resolve: {
      value: resolve,
    },
    reject: {
      value: reject,
    },
    revalidateWhenExecuted: {
      value: options.revalidateWhenExecuted,
    },
  }) as IdleTask;
  options.priority === 'high'
    ? its.tasks.unshift(idleTask)
    : its.tasks.push(idleTask);
  const { revalidateInterval } = options;
  if (revalidateInterval !== undefined) {
    const reregisterIdleTask = (): void => {
      setTimeout(() => {
        // Low Priority
        its.tasks.push(idleTask);
        reregisterIdleTask();
      }, revalidateInterval);
    };
    reregisterIdleTask();
  }
  if (its.requestIdleCallbackId) {
    return idleTaskId;
  }
  its.requestIdleCallbackId = rIC(runIdleTasks, {
    timeout: its.taskGlobalOptions.interval,
  });
  return idleTaskId;
};

export default setIdleTask;
