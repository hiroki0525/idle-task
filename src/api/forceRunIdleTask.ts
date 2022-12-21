import type { WaitForIdleTaskOptions } from './waitForIdleTask';
import isRunIdleTask from './isRunIdleTask';
import {
  defaultWaitForIdleTaskOptions,
  executeTask,
  getResultFromCache,
  IdleTask,
  idleTaskIdProp,
  idleTaskState as its,
} from '../internals';

export type ForceRunIdleTaskOptions = Pick<WaitForIdleTaskOptions, 'cache'>;

const defaultForceRunIdleTaskOptions = defaultWaitForIdleTaskOptions;

const forceRunIdleTask = async (
  id: number,
  options: ForceRunIdleTaskOptions = defaultForceRunIdleTaskOptions
): Promise<any> => {
  if (isRunIdleTask(id)) {
    return getResultFromCache(id, options.cache === false);
  }
  const task = its.tasks.find(task => task[idleTaskIdProp] === id) as IdleTask;
  executeTask(task);
  const result = getResultFromCache(id, options.cache === false);
  its.tasks = its.tasks.filter(task => task[idleTaskIdProp] !== id);
  return result;
};

export default forceRunIdleTask;