import {
  cIC,
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelAllIdleTasks = (): void => {
  its.tasks.forEach(resolveTaskResultWhenCancel);
  its.tasks.length = 0;
  its.idleTaskResultMap.clear();
  its.requestIdleCallbackId && cIC(its.requestIdleCallbackId as any); // TypeScript Error because requestIdleCallbackId is number | NodeJS.Timeout.
};

export default cancelAllIdleTasks;
