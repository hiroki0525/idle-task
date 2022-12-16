import { idleTaskIdProp, idleTaskState as its } from '../internals';

// deprecated
const isRunIdleTask = (id: number): boolean =>
  its.tasks.findIndex(task => task[idleTaskIdProp] === id) === -1;

export default isRunIdleTask;
