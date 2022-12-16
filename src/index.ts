import cancelAllIdleTasks from './api/cancelAllIdleTasks';
import cancelIdleTask from './api/cancelIdleTask';
import configureIdleTask, { ConfigureOptions } from './api/configureIdleTask';
import forceRunIdleTask, {
  ForceRunIdleTaskOptions,
} from './api/forceRunIdleTask';
import getResultFromIdleTask, {
  GetResultFromIdleTaskOptions,
} from './api/getResultFromIdleTask';
import isRunIdleTask from './api/isRunIdleTask';
import waitForIdleTask, {
  WaitForIdleTaskOptions,
  WaitForIdleTaskTimeoutError,
} from './api/waitForIdleTask';
import setIdleTask, { SetIdleTaskOptions } from './api/setIdleTask';

export {
  cancelAllIdleTasks,
  cancelIdleTask,
  configureIdleTask,
  ConfigureOptions,
  forceRunIdleTask,
  ForceRunIdleTaskOptions,
  getResultFromIdleTask,
  GetResultFromIdleTaskOptions,
  isRunIdleTask,
  waitForIdleTask,
  WaitForIdleTaskTimeoutError,
  WaitForIdleTaskOptions,
  setIdleTask,
  SetIdleTaskOptions,
};
