import {
  executeTask,
  findIdleTasksFromQueue,
  getResultFromCache,
  idleTaskState as its,
  removeIdleTaskFromQueue,
} from '../internals';
import getIdleTaskStatus from './getIdleTaskStatus';
import { IdleTaskKey } from './setIdleTask';

const forceRunIdleTask = async (key: IdleTaskKey): Promise<any> => {
  const cacheResult = getResultFromCache(key);
  if (getIdleTaskStatus(key) !== 'ready') {
    return cacheResult;
  }
  const targetTaskId = key.id;
  const tasks = findIdleTasksFromQueue(targetTaskId);
  const latestEnqueuedTask = tasks[tasks.length - 1];
  executeTask(latestEnqueuedTask);
  const result = getResultFromCache(key);
  if (latestEnqueuedTask.revalidateWhenExecuted) {
    const latestEnqueuedTaskIndex = its.tasks.length - 1;
    its.tasks = its.tasks.filter(
      (task, index) =>
        index === latestEnqueuedTaskIndex || task.id !== targetTaskId
    );
  } else {
    removeIdleTaskFromQueue(targetTaskId);
  }
  return result;
};

export default forceRunIdleTask;
