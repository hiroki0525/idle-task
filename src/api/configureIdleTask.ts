import {
  ConfigurableWaitForIdleTaskOptions,
  idleTaskState as its,
} from '../internals';
import type { WaitForIdleTaskOptions } from './waitForIdleTask';

type ConfigurableSetIdleTaskOptions = Pick<WaitForIdleTaskOptions, 'cache'>;

export type ConfigureOptions = {
  readonly interval?: number;
  readonly debug?: boolean;
} & ConfigurableSetIdleTaskOptions &
  ConfigurableWaitForIdleTaskOptions;

const configureIdleTask = (options: ConfigureOptions): void => {
  its.taskGlobalOptions = options;
};

export default configureIdleTask;
