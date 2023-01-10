import {
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelIdleTask = (id: number): void => {
  const task = its.tasks.find(task => task.id === id);
  task && resolveTaskResultWhenCancel(task);
  its.idleTaskResultMap.delete(id);
  its.tasks = its.tasks.filter(task => task.id !== id);
};

export default cancelIdleTask;
