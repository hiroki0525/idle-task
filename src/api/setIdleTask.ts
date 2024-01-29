import {
  IdleTask,
  IdleTaskFunction,
  rIC,
  executeTask,
  idleTaskState as its,
  removeIdleTaskFromQueue,
} from '../internals';

export interface IdleTaskKey {
  readonly id: number;
}

export interface SetIdleTaskOptions {
  readonly priority?: 'low' | 'high';
  readonly revalidateInterval?: number;
  readonly revalidateWhenExecuted?: boolean;
  readonly taskName?: string;
  readonly overwriteTask?: IdleTaskKey;
}

const createTimeRemainingDidTimeout = (): (() => boolean) => {
  const start = performance.now();
  return () => performance.now() - start < 50;
};

type LogLevel = 'info' | 'warn';

const logIdleTask = (message: string, level: LogLevel = 'info'): void => {
  console[level](
    '%cidle-task',
    'background:#717171;color:white;padding:2px 3px;border-radius:2px;font-size:0.8em;',
    message
  );
};

const logCallRequestIdleCallback = (
  reason: 'timeout' | 'idle',
  timeRemaining: number
) => {
  logIdleTask(
    `Call requestIdleCallback, reason: ${reason}, timeRemaining: ${timeRemaining} ms`
  );
};

const getTimeRemainingAndLog = (
  deadline: IdleDeadline
): readonly [() => boolean, () => void] => {
  const { didTimeout } = deadline;
  if (didTimeout) {
    return [
      createTimeRemainingDidTimeout(),
      () => logCallRequestIdleCallback('timeout', 50),
    ];
  }
  return [
    () => deadline.timeRemaining() > 0,
    () =>
      logCallRequestIdleCallback(
        'idle',
        normalizeTime(deadline.timeRemaining())
      ),
  ];
};

const normalizeTime = (time: number): number => Math.ceil(time * 100) / 100;

const runIdleTasks = (deadline: IdleDeadline): void => {
  const [isTimeRemaining, log] = getTimeRemainingAndLog(deadline);
  const shouldOutputLog =
    its.taskGlobalOptions.debug && typeof self !== 'undefined';
  shouldOutputLog && log();
  while (isTimeRemaining() && its.tasks.length > 0) {
    const task = its.tasks.shift() as IdleTask;
    if (shouldOutputLog) {
      const start = performance.now();
      executeTask(task);
      const executionTime = normalizeTime(performance.now() - start);
      logIdleTask(
        `Run task, name: ${task.name || 'anonymous'}(id: ${
          task.id
        }), executionTime: ${executionTime} ms`,
        executionTime > 50 ? 'warn' : 'info'
      );
    } else {
      executeTask(task);
    }
  }
  if (its.tasks.length > 0) {
    scheduleIdleTask();
    return;
  }
  its.requestIdleCallbackId = NaN;
};

const scheduleIdleTask = () => {
  its.requestIdleCallbackId = rIC(runIdleTasks, {
    timeout: its.taskGlobalOptions.interval,
  });
};

let id = 0;
const defaultSetIdleTaskOptions: SetIdleTaskOptions = {
  priority: 'low',
  revalidateWhenExecuted: false,
} as const;

const setIdleTask = (
  task: IdleTaskFunction,
  options: SetIdleTaskOptions = defaultSetIdleTaskOptions
): IdleTaskKey => {
  const { overwriteTask } = options;
  const idleTaskKey = overwriteTask ?? Object.freeze({ id: ++id });
  if (overwriteTask) {
    removeIdleTaskFromQueue(idleTaskKey.id);
  }
  let resolve, reject;
  its.idleTaskResultMap.set(
    idleTaskKey,
    new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    })
  );
  const idleTaskId = idleTaskKey.id;
  const { revalidateInterval } = options;
  const idleTask = Object.defineProperties(() => task(), {
    id: {
      value: idleTaskId,
    },
    name: {
      value: options.taskName || task.name,
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
  if (revalidateInterval !== undefined) {
    its.idleTaskRevalidateIntervalMap.set(
      idleTaskId,
      setInterval(() => {
        // Low Priority
        its.tasks.push(idleTask);
        its.requestIdleCallbackId || scheduleIdleTask();
      }, revalidateInterval)
    );
  }
  options.priority === 'high'
    ? its.tasks.unshift(idleTask)
    : its.tasks.push(idleTask);
  if (its.requestIdleCallbackId) {
    return idleTaskKey;
  }
  scheduleIdleTask();
  return idleTaskKey;
};

export default setIdleTask;
