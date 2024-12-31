import type {
  ConfigurableWaitForIdleTaskOptions,
  IdleTaskFunction,
} from '../internals';
import setIdleTask, { type SetIdleTaskOptions } from './setIdleTask';
import waitForIdleTask from './waitForIdleTask';

export type GetResultFromIdleTaskOptions = Pick<
  SetIdleTaskOptions,
  'priority' | 'taskName'
> &
  ConfigurableWaitForIdleTaskOptions;

const getResultFromIdleTask = (
  task: IdleTaskFunction,
  options?: GetResultFromIdleTaskOptions
): ReturnType<typeof waitForIdleTask> =>
  waitForIdleTask(
    setIdleTask(task, {
      priority: options?.priority,
      taskName: options?.taskName,
    }),
    {
      timeout: options?.timeout,
      timeoutStrategy: options?.timeoutStrategy,
    }
  );

export default getResultFromIdleTask;
