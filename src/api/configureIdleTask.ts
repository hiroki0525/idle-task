import {
  ConfigurableWaitForIdleTaskOptions,
  idleTaskState as its,
} from '../internals';

export type ConfigureOptions = {
  readonly interval?: number;
  readonly debug?: boolean;
} & ConfigurableWaitForIdleTaskOptions;

const configureIdleTask = (options: ConfigureOptions): void => {
  its.taskGlobalOptions = options;
};

export default configureIdleTask;
