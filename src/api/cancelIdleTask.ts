import {
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelIdleTask = (id: number): void => {
  const tasks = its.tasks.filter(task => task.id === id);
  tasks.length > 0 && tasks.forEach(resolveTaskResultWhenCancel);
  its.idleTaskResultMap.delete(id);
  its.tasks = its.tasks.filter(task => task.id !== id);
};

export default cancelIdleTask;
