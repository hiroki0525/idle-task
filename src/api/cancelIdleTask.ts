import {
  idleTaskIdProp,
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelIdleTask = (id: number): void => {
  const task = its.tasks.find(task => task[idleTaskIdProp] === id);
  task && resolveTaskResultWhenCancel(task);
  its.idleTaskResultMap.delete(id);
  its.tasks = its.tasks.filter(task => task[idleTaskIdProp] !== id);
};

export default cancelIdleTask;
