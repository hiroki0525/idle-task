import {
  getResultFromIdleTask,
  GetResultFromIdleTaskOptions,
} from '../../index';

export type ImportWhenIdleOptions = GetResultFromIdleTaskOptions;

const importWhenIdle = (
  factory: () => Promise<any>,
  options?: ImportWhenIdleOptions
): Promise<ReturnType<typeof factory>> =>
  getResultFromIdleTask(factory, options);

export default importWhenIdle;
