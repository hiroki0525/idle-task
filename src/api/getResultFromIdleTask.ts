import type {
  ConfigurableWaitForIdleTaskOptions,
  IdleTaskFunction,
} from '../internals';
import waitForIdleTask from './waitForIdleTask';
import setIdleTask, { SetIdleTaskOptions } from './setIdleTask';

export type GetResultFromIdleTaskOptions = Pick<
  SetIdleTaskOptions,
  'priority'
> &
  ConfigurableWaitForIdleTaskOptions;

const getResultFromIdleTask = (
  task: IdleTaskFunction,
  options?: GetResultFromIdleTaskOptions
): ReturnType<typeof waitForIdleTask> =>
  waitForIdleTask(setIdleTask(task, { priority: options?.priority }), {
    timeout: options?.timeout,
    timeoutStrategy: options?.timeoutStrategy,
  });

export default getResultFromIdleTask;
