import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';
import { IdleTaskKey } from '../api/setIdleTask';

describe('waitForIdleTask', () => {
  let firstTaskKey: IdleTaskKey;
  let secondTaskKey: IdleTaskKey;
  let thirdTaskKey: IdleTaskKey;

  describe('tasks are success', () => {
    beforeEach(() => {
      firstTaskKey = idleTaskModule!.setIdleTask(() => 'firstTask');
      secondTaskKey = idleTaskModule!.setIdleTask(() => new Promise(r => r(2)));
      thirdTaskKey = idleTaskModule!.setIdleTask(() =>
        Promise.resolve('thirdTask')
      );
      runRequestIdleCallback();
    });

    it('return first task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(firstTaskKey)).resolves.toBe(
        'firstTask'
      );
    });

    it('return second task result', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(secondTaskKey)
      ).resolves.toBe(2);
    });

    it('return third task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(thirdTaskKey)).resolves.toBe(
        'thirdTask'
      );
    });
  });

  describe('tasks are failure', () => {
    beforeEach(() => {
      firstTaskKey = idleTaskModule!.setIdleTask(() => {
        throw new Error('firstTask');
      });
      secondTaskKey = idleTaskModule!.setIdleTask(() =>
        Promise.reject('secondTask')
      );
      thirdTaskKey = idleTaskModule!.setIdleTask(() =>
        Promise.reject(new Error('thirdTask'))
      );
      runRequestIdleCallback();
    });

    it('all tasks throw errors', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(firstTaskKey)
      ).rejects.toThrow('firstTask');
      await expect(idleTaskModule!.waitForIdleTask(secondTaskKey)).rejects.toBe(
        'secondTask'
      );
      await expect(
        idleTaskModule!.waitForIdleTask(thirdTaskKey)
      ).rejects.toThrow('thirdTask');
    });
  });

  describe('not set timeout option', () => {
    describe('set no options', () => {
      beforeEach(async () => {
        firstTaskKey = idleTaskModule!.setIdleTask(() => 'firstTask');
        runRequestIdleCallback();
      });

      it('return task result', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskKey)
        ).resolves.toBe('firstTask');
      });
    });

    describe('set no timeout option', () => {
      beforeEach(async () => {
        firstTaskKey = idleTaskModule!.setIdleTask(() => 'firstTask');
        runRequestIdleCallback();
      });

      it('return task result', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskKey, {})
        ).resolves.toBe('firstTask');
      });
    });
  });

  describe('set timeout option', () => {
    let result: Promise<any>;

    describe('not timeout', () => {
      describe('using configureIdleTask', () => {
        describe('with WaitForIdleTask.timeout', () => {
          beforeEach(async () => {
            idleTaskModule!.configureIdleTask({ timeout: 9 });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 8)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
              timeout: 10,
            });
            runRequestIdleCallback();
          });

          it('return task result', async () => {
            await expect(result).resolves.toBe('mockFirstTask');
          });
        });
        describe('without WaitForIdleTask.timeout', () => {
          beforeEach(async () => {
            idleTaskModule!.configureIdleTask({ timeout: 10 });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 8)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskKey);
            runRequestIdleCallback();
          });

          it('return task result', async () => {
            await expect(result).resolves.toBe('mockFirstTask');
          });
        });
      });
      describe('not using configureIdleTask', () => {
        beforeEach(async () => {
          firstTaskKey = idleTaskModule!.setIdleTask(
            createTask(mockFirstTask, 8)
          );
          result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
            timeout: 10,
          });
          runRequestIdleCallback();
        });

        it('return task result', async () => {
          await expect(result).resolves.toBe('mockFirstTask');
        });
      });
    });

    describe('timeout', () => {
      describe('using configureIdleTask', () => {
        describe('with WaitForIdleTask.timeout', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({ timeout: 11 });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
              timeout: 10,
            });
            runRequestIdleCallback();
          });

          it('throw WaitForIdleTaskTimeoutError', async () => {
            await expect(result).rejects.toThrow(
              new idleTaskModule!.WaitForIdleTaskTimeoutError()
            );
          });
        });
        describe('without WaitForIdleTask.timeout', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({ timeout: 10 });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskKey);
            runRequestIdleCallback();
          });

          it('throw WaitForIdleTaskTimeoutError', async () => {
            await expect(result).rejects.toThrow(
              new idleTaskModule!.WaitForIdleTaskTimeoutError()
            );
          });
        });

        describe('ConfigureOptions.timeoutStrategy is undefined', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({
              timeout: 10,
            });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey);
              runRequestIdleCallback();
            });

            it('throw WaitForIdleTaskTimeoutError', async () => {
              await expect(result).rejects.toThrow(
                new idleTaskModule!.WaitForIdleTaskTimeoutError()
              );
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is forceRun', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
                timeoutStrategy: 'forceRun',
              });
              runRequestIdleCallback();
            });

            it('return result', async () => {
              await expect(result).resolves.toBe('mockFirstTask');
            });
          });
        });

        describe('ConfigureOptions.timeoutStrategy is error', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({
              timeout: 10,
              timeoutStrategy: 'error',
            });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey);
              runRequestIdleCallback();
            });

            it('throw WaitForIdleTaskTimeoutError', async () => {
              await expect(result).rejects.toThrow(
                new idleTaskModule!.WaitForIdleTaskTimeoutError()
              );
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is forceRun', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
                timeoutStrategy: 'forceRun',
              });
              runRequestIdleCallback();
            });

            it('return result', async () => {
              await expect(result).resolves.toBe('mockFirstTask');
            });
          });
        });

        describe('ConfigureOptions.timeoutStrategy is forceRun', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({
              timeout: 10,
              timeoutStrategy: 'forceRun',
            });
            firstTaskKey = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey);
              runRequestIdleCallback();
            });

            it('return result', async () => {
              await expect(result).resolves.toBe('mockFirstTask');
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is error', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
                timeoutStrategy: 'error',
              });
              runRequestIdleCallback();
            });

            it('throw WaitForIdleTaskTimeoutError', async () => {
              await expect(result).rejects.toThrow(
                new idleTaskModule!.WaitForIdleTaskTimeoutError()
              );
            });
          });
        });
      });

      describe('not using configureIdleTask', () => {
        beforeEach(() => {
          firstTaskKey = idleTaskModule!.setIdleTask(
            createTask(mockFirstTask, 9)
          );
        });

        describe('WaitForIdleTaskOptions.timeoutStrategy is not set', () => {
          beforeEach(() => {
            result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
              timeout: 10,
            });
            runRequestIdleCallback();
          });

          it('return result', async () => {
            await expect(result).resolves.toBe('mockFirstTask');
          });
        });

        describe('WaitForIdleTaskOptions.timeoutStrategy is error', () => {
          beforeEach(() => {
            result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
              timeout: 10,
              timeoutStrategy: 'error',
            });
            runRequestIdleCallback();
          });

          it('throw WaitForIdleTaskTimeoutError', async () => {
            await expect(result).rejects.toThrow(
              new idleTaskModule!.WaitForIdleTaskTimeoutError()
            );
          });
        });

        describe('WaitForIdleTaskOptions.timeoutStrategy is forceRun', () => {
          beforeEach(async () => {
            result = idleTaskModule!.waitForIdleTask(firstTaskKey, {
              timeout: 10,
              timeoutStrategy: 'forceRun',
            });
            runRequestIdleCallback();
          });

          it('return result', async () => {
            await expect(result).resolves.toBe('mockFirstTask');
          });
        });
      });
    });
  });

  describe('not call cancelIdleTask or cancelAllIdleTasks', () => {
    beforeEach(() => {
      firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      runRequestIdleCallback();
    });

    it('return task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(firstTaskKey)).resolves.toBe(
        'mockFirstTask'
      );
    });
  });

  describe('call cancelIdleTask or cancelAllIdleTasks', () => {
    describe('call cancelIdleTask', () => {
      describe('task is executed', () => {
        beforeEach(() => {
          firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          runRequestIdleCallback();
          idleTaskModule!.cancelIdleTask(firstTaskKey);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskKey)
          ).resolves.toBeUndefined();
        });
      });

      describe('task is not executed', () => {
        let resultPromise: Promise<any>;

        beforeEach(() => {
          firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          resultPromise = idleTaskModule!.waitForIdleTask(firstTaskKey);
          idleTaskModule!.cancelIdleTask(firstTaskKey);
          runRequestIdleCallback();
        });

        it('return undefined', async () => {
          await expect(resultPromise).resolves.toBeUndefined();
        });
      });
    });

    describe('call cancelAllIdleTasks', () => {
      describe('task is executed', () => {
        beforeEach(() => {
          firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          secondTaskKey = idleTaskModule!.setIdleTask(
            createTask(mockSecondTask)
          );
          thirdTaskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
          runRequestIdleCallback();
          idleTaskModule!.cancelAllIdleTasks();
        });

        it('first task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskKey)
          ).resolves.toBeUndefined();
        });

        it('second task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(secondTaskKey)
          ).resolves.toBeUndefined();
        });

        it('third task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(thirdTaskKey)
          ).resolves.toBeUndefined();
        });
      });

      describe('task is not executed', () => {
        let firstResultPromise: Promise<any>;
        let secondResultPromise: Promise<any>;
        let thirdResultPromise: Promise<any>;

        beforeEach(() => {
          firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          secondTaskKey = idleTaskModule!.setIdleTask(
            createTask(mockSecondTask)
          );
          thirdTaskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
          firstResultPromise = idleTaskModule!.waitForIdleTask(firstTaskKey);
          secondResultPromise = idleTaskModule!.waitForIdleTask(secondTaskKey);
          thirdResultPromise = idleTaskModule!.waitForIdleTask(thirdTaskKey);
          idleTaskModule!.cancelAllIdleTasks();
          runRequestIdleCallback();
        });

        it('first task return undefined', async () => {
          await expect(firstResultPromise).resolves.toBeUndefined();
        });

        it('second task return undefined', async () => {
          await expect(secondResultPromise).resolves.toBeUndefined();
        });

        it('third task return undefined', async () => {
          await expect(thirdResultPromise).resolves.toBeUndefined();
        });
      });
    });
  });
});
