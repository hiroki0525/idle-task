import cancelAllIdleTasks from './api/cancelAllIdleTasks';
import cancelIdleTask from './api/cancelIdleTask';
import configureIdleTask, { ConfigureOptions } from './api/configureIdleTask';
import forceRunIdleTask from './api/forceRunIdleTask';
import getIdleTaskStatus, { IdleTaskStatus } from './api/getIdleTaskStatus';
import getResultFromIdleTask, {
  GetResultFromIdleTaskOptions,
} from './api/getResultFromIdleTask';
import setIdleTask, {
  SetIdleTaskOptions,
  IdleTaskKey,
} from './api/setIdleTask';
import waitForIdleTask, {
  WaitForIdleTaskOptions,
  WaitForIdleTaskTimeoutError,
} from './api/waitForIdleTask';

export {
  cancelAllIdleTasks,
  cancelIdleTask,
  configureIdleTask,
  ConfigureOptions,
  forceRunIdleTask,
  getResultFromIdleTask,
  GetResultFromIdleTaskOptions,
  getIdleTaskStatus,
  IdleTaskStatus,
  waitForIdleTask,
  WaitForIdleTaskTimeoutError,
  WaitForIdleTaskOptions,
  setIdleTask,
  SetIdleTaskOptions,
  IdleTaskKey,
};
