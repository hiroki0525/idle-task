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
};

const setIdleTask = (
  task: IdleTaskFunction,
  options: SetIdleTaskOptions = defaultSetIdleTaskOptions
): number => {
  const idleTaskId = ++id;
  const idleTask = Object.defineProperties(() => task(), {
    id: {
      value: idleTaskId,
    },
    name: {
      value: task.name,
    },
  }) as IdleTask;
  const isUseCache = options.cache ?? its.taskGlobalOptions.cache;
  if (isUseCache !== false) {
    its.idleTaskResultMap.set(
      idleTaskId,
      new Promise((resolve, reject) => {
        Object.defineProperty(idleTask, 'promiseExecutor', {
          value: [resolve, reject],
        });
      })
    );
  }
  options.priority === 'high'
    ? its.tasks.unshift(idleTask)
    : its.tasks.push(idleTask);
  if (its.requestIdleCallbackId) {
    return idleTaskId;
  }
  its.requestIdleCallbackId = rIC(runIdleTasks, {
    timeout: its.taskGlobalOptions.interval,
  });
  return idleTaskId;
};

export default setIdleTask;
