import type { WaitForIdleTaskOptions } from './waitForIdleTask';
import {
  defaultWaitForIdleTaskOptions,
  executeTask,
  getResultFromCache,
  IdleTask,
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
  const task = its.tasks.find(task => task.id === id) as IdleTask;
  executeTask(task);
  const result = getResultFromCache(id, options.cache === false);
  its.tasks = its.tasks.filter(task => task.id !== id);
  return result;
};

export default forceRunIdleTask;
