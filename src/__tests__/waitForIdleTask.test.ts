import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';

describe('waitForIdleTask', () => {
  let firstTaskId: number;
  let secondTaskId: number;
  let thirdTaskId: number;

  describe('tasks are success', () => {
    beforeEach(() => {
      firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask');
      secondTaskId = idleTaskModule!.setIdleTask(() => new Promise(r => r(2)));
      thirdTaskId = idleTaskModule!.setIdleTask(() =>
        Promise.resolve('thirdTask')
      );
      runRequestIdleCallback();
    });

    it('return first task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(firstTaskId)).resolves.toBe(
        'firstTask'
      );
    });

    it('return second task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(secondTaskId)).resolves.toBe(
        2
      );
    });

    it('return third task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(thirdTaskId)).resolves.toBe(
        'thirdTask'
      );
    });
  });

  describe('tasks are failure', () => {
    beforeEach(() => {
      firstTaskId = idleTaskModule!.setIdleTask(() => {
        throw new Error('firstTask');
      });
      secondTaskId = idleTaskModule!.setIdleTask(() =>
        Promise.reject('secondTask')
      );
      thirdTaskId = idleTaskModule!.setIdleTask(() =>
        Promise.reject(new Error('thirdTask'))
      );
      runRequestIdleCallback();
    });

    it('all tasks throw errors', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(firstTaskId)
      ).rejects.toThrow('firstTask');
      await expect(idleTaskModule!.waitForIdleTask(secondTaskId)).rejects.toBe(
        'secondTask'
      );
      await expect(
        idleTaskModule!.waitForIdleTask(thirdTaskId)
      ).rejects.toThrow('thirdTask');
    });
  });

  describe('cache is true', () => {
    let expected: Promise<any>;
    const result = { result: 'firstTask' };

    describe('cache is only once', () => {
      describe('set WaitForIdleTaskOptions which cache is false', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => result);
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId, {
            cache: false,
          });
        });

        it('return not same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.not.toBe(expected);
        });

        it('first result return Object', () => {
          expect(expected).toBe(result);
        });

        it('second result return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });
    });

    describe('cache is not only once', () => {
      describe('set no WaitForIdleTaskOptions', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => result);
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(result);
        });
      });

      describe('set WaitForIdleTaskOptions which cache is true', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => result);
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId, {
            cache: true,
          });
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(result);
        });
      });

      describe('set WaitForIdleTaskOptions which cache is undefined', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => result);
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId, {});
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(result);
        });
      });

      describe('set no ConfigureOptions', () => {
        describe('set no SetIdleTaskOptions', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result);
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is undefined', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {});
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is true', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {
              cache: true,
            });
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });
      });

      describe('set ConfigureOptions which cache is undefined', () => {
        beforeEach(() => {
          idleTaskModule!.configureIdleTask({});
        });

        describe('set no SetIdleTaskOptions', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result);
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is undefined', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {});
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is true', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {
              cache: true,
            });
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });
      });

      describe('set ConfigureOptions which cache is true', () => {
        beforeEach(() => {
          idleTaskModule!.configureIdleTask({ cache: true });
        });

        describe('set no SetIdleTaskOptions', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result);
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is undefined', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {});
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });

        describe('set SetIdleTaskOptions which cache is true', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {
              cache: true,
            });
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });
      });

      describe('set ConfigureOptions which cache is false', () => {
        beforeEach(() => {
          idleTaskModule!.configureIdleTask({ cache: false });
        });

        describe('set SetIdleTaskOptions which cache is true', () => {
          beforeEach(async () => {
            firstTaskId = idleTaskModule!.setIdleTask(() => result, {
              cache: true,
            });
            runRequestIdleCallback();
            expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
          });

          it('return same Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(expected);
          });

          it('return Object', async () => {
            await expect(
              idleTaskModule!.waitForIdleTask(firstTaskId)
            ).resolves.toBe(result);
          });
        });
      });
    });
  });

  describe('cache is false', () => {
    let expected: Promise<any>;

    describe('set no ConfigureOptions', () => {
      describe('set SetIdleTaskOptions which cache is false', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask', {
            cache: false,
          });
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });
    });
    describe('set ConfigureOptions which cache is undefined', () => {
      beforeEach(() => {
        idleTaskModule!.configureIdleTask({});
      });

      describe('set SetIdleTaskOptions which cache is false', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask', {
            cache: false,
          });
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });
    });

    describe('set ConfigureOptions which cache is false', () => {
      beforeEach(() => {
        idleTaskModule!.configureIdleTask({ cache: false });
      });

      describe('set no SetIdleTaskOptions', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask');
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });

      describe('set SetIdleTaskOptions which cache is undefined', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask', {});
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });

      describe('set SetIdleTaskOptions which cache is false', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask', {
            cache: false,
          });
          runRequestIdleCallback();
          expected = await idleTaskModule!.waitForIdleTask(firstTaskId);
        });

        it('return same Object', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBe(expected);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });
    });
  });

  describe('not set timeout option', () => {
    describe('set no options', () => {
      beforeEach(async () => {
        firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask');
        runRequestIdleCallback();
      });

      it('return task result', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskId)
        ).resolves.toBe('firstTask');
      });
    });

    describe('set no timeout option', () => {
      beforeEach(async () => {
        firstTaskId = idleTaskModule!.setIdleTask(() => 'firstTask');
        runRequestIdleCallback();
      });

      it('return task result', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskId, {})
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
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 8)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 8)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskId);
            runRequestIdleCallback();
          });

          it('return task result', async () => {
            await expect(result).resolves.toBe('mockFirstTask');
          });
        });
      });
      describe('not using configureIdleTask', () => {
        beforeEach(async () => {
          firstTaskId = idleTaskModule!.setIdleTask(
            createTask(mockFirstTask, 8)
          );
          result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
            result = idleTaskModule!.waitForIdleTask(firstTaskId);
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
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskId);
              runRequestIdleCallback();
            });

            it('throw WaitForIdleTaskTimeoutError', async () => {
              await expect(result).rejects.toThrow(
                new idleTaskModule!.WaitForIdleTaskTimeoutError()
              );
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is forceRun', () => {
            describe('cache is true', () => {
              beforeEach(() => {
                result = idleTaskModule!.waitForIdleTask(firstTaskId, {
                  timeoutStrategy: 'forceRun',
                });
                runRequestIdleCallback();
              });

              it('return result', async () => {
                await expect(result).resolves.toBe('mockFirstTask');
              });
            });
            describe('cache is false', () => {
              beforeEach(() => {
                result = idleTaskModule!.waitForIdleTask(firstTaskId, {
                  timeoutStrategy: 'forceRun',
                  cache: false,
                });
                runRequestIdleCallback();
              });

              it('return result', async () => {
                await expect(result).resolves.toBe('mockFirstTask');
              });
            });
          });
        });

        describe('ConfigureOptions.timeoutStrategy is error', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({
              timeout: 10,
              timeoutStrategy: 'error',
            });
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskId);
              runRequestIdleCallback();
            });

            it('throw WaitForIdleTaskTimeoutError', async () => {
              await expect(result).rejects.toThrow(
                new idleTaskModule!.WaitForIdleTaskTimeoutError()
              );
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is forceRun', () => {
            describe('cache is true', () => {
              beforeEach(() => {
                result = idleTaskModule!.waitForIdleTask(firstTaskId, {
                  timeoutStrategy: 'forceRun',
                });
                runRequestIdleCallback();
              });

              it('return result', async () => {
                await expect(result).resolves.toBe('mockFirstTask');
              });
            });
            describe('cache is false', () => {
              beforeEach(() => {
                result = idleTaskModule!.waitForIdleTask(firstTaskId, {
                  timeoutStrategy: 'forceRun',
                  cache: false,
                });
                runRequestIdleCallback();
              });

              it('return result', async () => {
                await expect(result).resolves.toBe('mockFirstTask');
              });
            });
          });
        });

        describe('ConfigureOptions.timeoutStrategy is forceRun', () => {
          beforeEach(() => {
            idleTaskModule!.configureIdleTask({
              timeout: 10,
              timeoutStrategy: 'forceRun',
            });
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask, 9)
            );
          });

          describe('without WaitForIdleTaskOptions', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskId);
              runRequestIdleCallback();
            });

            it('return result', async () => {
              await expect(result).resolves.toBe('mockFirstTask');
            });
          });
          describe('with WaitForIdleTaskOptions.timeoutStrategy which is error', () => {
            beforeEach(() => {
              result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
          firstTaskId = idleTaskModule!.setIdleTask(
            createTask(mockFirstTask, 9)
          );
        });

        describe('WaitForIdleTaskOptions.timeoutStrategy is not set', () => {
          beforeEach(() => {
            result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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

        describe('WaitForIdleTaskOptions.timeoutStrategy is error', () => {
          beforeEach(() => {
            result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
            result = idleTaskModule!.waitForIdleTask(firstTaskId, {
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
      firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      runRequestIdleCallback();
    });

    it('return task result', async () => {
      await expect(idleTaskModule!.waitForIdleTask(firstTaskId)).resolves.toBe(
        'mockFirstTask'
      );
    });
  });

  describe('call cancelIdleTask or cancelAllIdleTasks', () => {
    describe('call cancelIdleTask', () => {
      describe('task is executed', () => {
        beforeEach(() => {
          firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          runRequestIdleCallback();
          idleTaskModule!.cancelIdleTask(firstTaskId);
        });

        it('return undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });
      });

      describe('task is not executed', () => {
        let resultPromise: Promise<any>;

        describe('call setIdleTask which cache is true', () => {
          beforeEach(() => {
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask)
            );
            resultPromise = idleTaskModule!.waitForIdleTask(firstTaskId);
            idleTaskModule!.cancelIdleTask(firstTaskId);
            runRequestIdleCallback();
          });

          it('return undefined', async () => {
            await expect(resultPromise).resolves.toBeUndefined();
          });
        });

        describe('call setIdleTask which cache is true', () => {
          beforeEach(() => {
            firstTaskId = idleTaskModule!.setIdleTask(
              createTask(mockFirstTask),
              { cache: false }
            );
            resultPromise = idleTaskModule!.waitForIdleTask(firstTaskId);
            idleTaskModule!.cancelIdleTask(firstTaskId);
            runRequestIdleCallback();
          });

          it('return undefined', async () => {
            await expect(resultPromise).resolves.toBeUndefined();
          });
        });
      });
    });

    describe('call cancelAllIdleTasks', () => {
      describe('task is executed', () => {
        beforeEach(() => {
          firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          secondTaskId = idleTaskModule!.setIdleTask(
            createTask(mockSecondTask)
          );
          thirdTaskId = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
          runRequestIdleCallback();
          idleTaskModule!.cancelAllIdleTasks();
        });

        it('first task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(firstTaskId)
          ).resolves.toBeUndefined();
        });

        it('second task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(secondTaskId)
          ).resolves.toBeUndefined();
        });

        it('third task returns undefined', async () => {
          await expect(
            idleTaskModule!.waitForIdleTask(thirdTaskId)
          ).resolves.toBeUndefined();
        });
      });

      describe('task is not executed', () => {
        let firstResultPromise: Promise<any>;
        let secondResultPromise: Promise<any>;
        let thirdResultPromise: Promise<any>;

        beforeEach(() => {
          firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          secondTaskId = idleTaskModule!.setIdleTask(
            createTask(mockSecondTask)
          );
          thirdTaskId = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
          firstResultPromise = idleTaskModule!.waitForIdleTask(firstTaskId);
          secondResultPromise = idleTaskModule!.waitForIdleTask(secondTaskId);
          thirdResultPromise = idleTaskModule!.waitForIdleTask(thirdTaskId);
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
