import {
  cIC,
  idleTaskState as its,
  resolveTaskResultWhenCancel,
} from '../internals';

const cancelAllIdleTasks = (): void => {
  // delete all revalidateInterval
  Array.from(its.idleTaskRevalidateIntervalMap.values()).forEach(clearInterval);
  its.idleTaskRevalidateIntervalMap.clear();
  resolveTaskResultWhenCancel(its.tasks);
  its.tasks.length = 0;
  // WeakMap has no clear method
  its.idleTaskResultMap = new WeakMap();
  its.requestIdleCallbackId && cIC(its.requestIdleCallbackId as any); // TypeScript Error because requestIdleCallbackId is number | NodeJS.Timeout.
};

export default cancelAllIdleTasks;
