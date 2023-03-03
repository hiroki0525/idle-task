import {
  IdleTaskKey,
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelIdleTask = (key: IdleTaskKey): void => {
  const targetTaskId = key.id;
  // delete revalidateInterval
  const revalidateIntervalId =
    its.idleTaskRevalidateIntervalMap.get(targetTaskId);
  if (revalidateIntervalId) {
    clearInterval(revalidateIntervalId);
    its.idleTaskRevalidateIntervalMap.delete(targetTaskId);
  }
  const tasks = its.tasks.filter(task => task.id === targetTaskId);
  resolveTaskResultWhenCancel(tasks);
  its.idleTaskResultMap.delete(key);
  its.tasks = its.tasks.filter(task => task.id !== targetTaskId);
};

export default cancelIdleTask;
