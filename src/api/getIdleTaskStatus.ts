import { IdleTaskKey, idleTaskState as its } from '../internals';

export type IdleTaskStatus = 'ready' | 'executed' | 'unknown';

const getIdleTaskStatus = (key: IdleTaskKey): IdleTaskStatus => {
  if (its.tasks.some(task => task.id === key.id)) {
    return 'ready';
  }
  // We can't know JavaScript Promise states like fulfilled.
  // 'unknown' means that the task was canceled or its result was deleted.
  if (!F(key)) {
    return 'unknown';
  }
  // WARNING: 'executed' means that the task was executed, not completed.
  return 'executed';
};

export default getIdleTaskStatus;
