import {
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelIdleTask = (id: number): void => {
  // delete revalidateInterval
  const revalidateIntervalId = its.idleTaskRevalidateIntervalMap.get(id);
  if (revalidateIntervalId) {
    clearInterval(revalidateIntervalId);
    its.idleTaskRevalidateIntervalMap.delete(id);
  }
  const tasks = its.tasks.filter(task => task.id === id);
  resolveTaskResultWhenCancel(tasks);
  its.idleTaskResultMap.delete(id);
  its.tasks = its.tasks.filter(task => task.id !== id);
};

export default cancelIdleTask;
