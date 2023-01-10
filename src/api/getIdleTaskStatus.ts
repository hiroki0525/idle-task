import { getResultFromCache, idleTaskState as its } from '../internals';

export type IdleTaskStatus = 'ready' | 'executed' | 'unknown';

const getIdleTaskStatus = (id: number): IdleTaskStatus => {
  if (its.tasks.some(task => task.id === id)) {
    return 'ready';
  }
  // We can't know JavaScript Promise states like fulfilled.
  // 'unknown' means that the task was canceled or its result was deleted.
  if (!getResultFromCache(id)) {
    return 'unknown';
  }
  // WARNING: 'executed' means that the task was executed, not completed.
  return 'executed';
};

export default getIdleTaskStatus;
