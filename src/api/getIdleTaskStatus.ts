import { getResultFromCache, idleTaskState as its } from '../internals';
import { IdleTaskKey } from './setIdleTask';

export type IdleTaskStatus = 'ready' | 'executed' | 'unknown';

const getIdleTaskStatus = (key: IdleTaskKey): IdleTaskStatus => {
  if (its.tasks.some(task => task.id === key.id)) {
    return 'ready';
  }
  // We can't know JavaScript Promise states like fulfilled.
  // 'unknown' means that the task was canceled or its result was deleted.
  if (!getResultFromCache(key)) {
    return 'unknown';
  }
  // WARNING: 'executed' means that the task was executed, not completed.
  return 'executed';
};

export default getIdleTaskStatus;
