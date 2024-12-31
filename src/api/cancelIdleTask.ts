import {
  findIdleTasksFromQueue,
  idleTaskState as its,
  removeIdleTaskFromQueue,
  resolveTaskResultWhenCancel,
} from '../internals';
import type { IdleTaskKey } from './setIdleTask';

const cancelIdleTask = (key: IdleTaskKey): void => {
  const targetTaskId = key.id;
  // delete revalidateInterval
  const revalidateIntervalId =
    its.idleTaskRevalidateIntervalMap.get(targetTaskId);
  if (revalidateIntervalId) {
    clearInterval(revalidateIntervalId);
    its.idleTaskRevalidateIntervalMap.delete(targetTaskId);
  }
  const tasks = findIdleTasksFromQueue(targetTaskId);
  resolveTaskResultWhenCancel(tasks);
  its.idleTaskResultMap.delete(key);
  removeIdleTaskFromQueue(targetTaskId);
};

export default cancelIdleTask;
