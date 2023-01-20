import type { WaitForIdleTaskOptions } from './waitForIdleTask';
import {
  defaultWaitForIdleTaskOptions,
  executeTask,
  getResultFromCache,
  idleTaskState as its,
} from '../internals';
import getIdleTaskStatus from './getIdleTaskStatus';

export type ForceRunIdleTaskOptions = Pick<WaitForIdleTaskOptions, 'cache'>;

const defaultForceRunIdleTaskOptions = defaultWaitForIdleTaskOptions;

const forceRunIdleTask = async (
  id: number,
  options: ForceRunIdleTaskOptions = defaultForceRunIdleTaskOptions
): Promise<any> => {
  if (getIdleTaskStatus(id) !== 'ready') {
    return getResultFromCache(id, options.cache === false);
  }
  const tasks = its.tasks.filter(task => task.id === id);
  const latestEnqueuedTask = tasks[tasks.length - 1];
  executeTask(latestEnqueuedTask);
  const result = getResultFromCache(id, options.cache === false);
  if (latestEnqueuedTask.revalidateWhenExecuted) {
    const latestEnqueuedTaskIndex = its.tasks.length - 1;
    its.tasks = its.tasks.filter(
      (task, index) => index === latestEnqueuedTaskIndex || task.id !== id
    );
  } else {
    its.tasks = its.tasks.filter(task => task.id !== id);
  }
  return result;
};

export default forceRunIdleTask;
