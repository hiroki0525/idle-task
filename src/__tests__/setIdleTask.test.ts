import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockRequestIdleCallback,
  mockSecondTask,
  mockThirdTask,
  reloadModule,
  requestIdleCallbackImpl,
  runRequestIdleCallback,
} from './util';

describe('setIdleTask', () => {
  describe('not debug mode', () => {
    describe('executed once', () => {
      let taskId: number;

      beforeEach(() => {
        taskId = idleTaskModule!.setIdleTask(createTask());
      });

      it('task id is 1', () => {
        expect(taskId).toBe(1);
      });

      it('called requestIdleCallback', () => {
        expect(mockRequestIdleCallback.mock.calls.length).toBe(1);
      });
    });

    describe('executed twice', () => {
      let taskId: number;

      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask());
        taskId = idleTaskModule!.setIdleTask(createTask());
      });

      it('task id is 2', () => {
        expect(taskId).toBe(2);
      });

      it('called requestIdleCallback once', () => {
        expect(mockRequestIdleCallback.mock.calls.length).toBe(1);
      });
    });

    describe('priority is low', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask, 100));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask, 100));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask, 100));
        runRequestIdleCallback();
      });

      it('first task is called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('second task is not called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(0);
      });

      it('third task is not called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(0);
      });

      it('called requestIdleCallback twice', () => {
        expect(mockRequestIdleCallback.mock.calls.length).toBe(2);
      });
    });

    describe('priority is high', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask, 100));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask, 100));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask, 100), {
          priority: 'high',
        });
        runRequestIdleCallback();
      });

      it('first task is not called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(0);
      });

      it('second task is not called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(0);
      });

      it('third task is called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(1);
      });

      it('called requestIdleCallback twice', () => {
        expect(mockRequestIdleCallback.mock.calls.length).toBe(2);
      });
    });

    describe('timeout', () => {
      const mockRequestIdleCallbackDidTimeout = jest
        .fn()
        .mockImplementation(requestIdleCallbackImpl(true));

      beforeEach(async () => {
        jest.resetModules();
        global.requestIdleCallback = mockRequestIdleCallbackDidTimeout;
        await reloadModule();
      });

      describe('executed time is less than 50ms', () => {
        beforeEach(async () => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask, 25));
          idleTaskModule!.setIdleTask(createTask(mockSecondTask, 24));
          idleTaskModule!.setIdleTask(createTask(mockThirdTask, 1));
          runRequestIdleCallback();
        });

        it('first task is called', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('second task is called', () => {
          expect(mockSecondTask.mock.calls.length).toBe(1);
        });

        it('third task is called', () => {
          expect(mockThirdTask.mock.calls.length).toBe(1);
        });

        it('called requestIdleCallback once', () => {
          expect(mockRequestIdleCallbackDidTimeout.mock.calls.length).toBe(1);
        });
      });

      describe('executed time is over 50ms', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask, 25));
          idleTaskModule!.setIdleTask(createTask(mockSecondTask, 25));
          idleTaskModule!.setIdleTask(createTask(mockThirdTask, 1));
          runRequestIdleCallback();
        });

        it('first task is called', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('second task is called', () => {
          expect(mockSecondTask.mock.calls.length).toBe(1);
        });

        it('third task is not called', () => {
          expect(mockThirdTask.mock.calls.length).toBe(0);
        });

        it('called requestIdleCallback twice', () => {
          expect(mockRequestIdleCallbackDidTimeout.mock.calls.length).toBe(2);
        });
      });
    });

    describe('without revalidateInterval', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        runRequestIdleCallback();
      });

      it('first task is called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('second task is called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(1);
      });

      it('third task is called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(1);
      });
    });

    describe('with revalidateInterval', () => {
      describe('registered task', () => {
        describe('registered task once', () => {
          beforeEach(() => {
            idleTaskModule!.setIdleTask(createTask(mockFirstTask), {
              revalidateInterval: 1,
            });
            idleTaskModule!.setIdleTask(createTask(mockSecondTask));
            idleTaskModule!.setIdleTask(createTask(mockThirdTask));
            runRequestIdleCallback();
          });

          it('first task is called twice', () => {
            expect(mockFirstTask.mock.calls.length).toBe(2);
          });

          it('second task is called', () => {
            expect(mockSecondTask.mock.calls.length).toBe(1);
          });

          it('third task is called', () => {
            expect(mockThirdTask.mock.calls.length).toBe(1);
          });
        });

        describe('registered task twice', () => {
          beforeEach(() => {
            idleTaskModule!.setIdleTask(createTask(mockFirstTask, 50));
            idleTaskModule!.setIdleTask(createTask(mockSecondTask), {
              revalidateInterval: 25,
            });
            idleTaskModule!.setIdleTask(createTask(mockThirdTask));
            // Only mockFirstTask will be executed.
            runRequestIdleCallback();
            runRequestIdleCallback();
          });

          it('first task is called', () => {
            expect(mockFirstTask.mock.calls.length).toBe(1);
          });

          it('second task is called three times', () => {
            expect(mockSecondTask.mock.calls.length).toBe(3);
          });

          it('third task is called', () => {
            expect(mockThirdTask.mock.calls.length).toBe(1);
          });
        });
      });

      describe('not registered task', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask), {
            revalidateInterval: 2,
          });
          idleTaskModule!.setIdleTask(createTask(mockSecondTask));
          idleTaskModule!.setIdleTask(createTask(mockThirdTask));
          runRequestIdleCallback();
        });

        it('first task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('second task is called', () => {
          expect(mockSecondTask.mock.calls.length).toBe(1);
        });

        it('third task is called', () => {
          expect(mockThirdTask.mock.calls.length).toBe(1);
        });
      });
    });

    describe('without revalidateWhenExecuted', () => {
      describe('revalidateWhenExecuted is undefined', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask));
          runRequestIdleCallback();
        });

        it('first task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });
      });

      describe('revalidateWhenExecuted is false', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask), {
            revalidateWhenExecuted: false,
          });
          runRequestIdleCallback();
        });

        it('first task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });
      });
    });

    describe('with revalidateWhenExecuted', () => {
      describe('revalidateWhenExecuted is true', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask, 25), {
            revalidateWhenExecuted: true,
          });
          runRequestIdleCallback();
        });

        it('first task is called twice', () => {
          expect(mockFirstTask.mock.calls.length).toBe(2);
        });
      });
    });
  });

  describe('debug mode', () => {
    let mockInfo: jest.SpyInstance;
    let mockWarn: jest.SpyInstance;

    beforeEach(() => {
      mockInfo = jest.spyOn(console, 'info');
      mockWarn = jest.spyOn(console, 'warn');
      idleTaskModule!.configureIdleTask({ debug: true });
    });

    afterEach(() => {
      mockInfo!.mockReset();
      mockWarn!.mockReset();
    });

    // server context
    if (typeof self === 'undefined') {
      it('not called info', () => {
        expect(console.info).not.toHaveBeenCalled();
      });
      it('not called warn', () => {
        expect(console.warn).not.toHaveBeenCalled();
      });
    } else {
      describe('anonymous function', () => {
        let taskId: number;

        beforeEach(() => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          taskId = idleTaskModule!.setIdleTask(() => {});
          runRequestIdleCallback();
        });

        it('include anonymous', () => {
          expect((console.info as any).mock.calls[0][2]).toMatch(
            `anonymous(${taskId})`
          );
        });
      });

      describe('named function', () => {
        let taskId: number;

        beforeEach(() => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          const test = () => {};
          taskId = idleTaskModule!.setIdleTask(test);
          runRequestIdleCallback();
        });

        it('include function name and task id', () => {
          expect((console.info as any).mock.calls[0][2]).toMatch(
            `test(${taskId})`
          );
        });
      });

      describe('task took over 50 ms', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask, 50.001));
          runRequestIdleCallback();
        });

        it('called warn', () => {
          expect(console.warn).toHaveBeenCalled();
        });

        it('not called info', () => {
          expect(console.info).not.toHaveBeenCalled();
        });

        it('include 50.01 ms', () => {
          expect((console.warn as any).mock.calls[0][2]).toMatch('50.01 ms');
        });
      });

      describe('task took less than 50 ms', () => {
        beforeEach(() => {
          idleTaskModule!.setIdleTask(createTask(mockFirstTask, 49.999));
          runRequestIdleCallback();
        });

        it('not called warn', () => {
          expect(console.warn).not.toHaveBeenCalled();
        });

        it('called info', () => {
          expect(console.info).toHaveBeenCalled();
        });

        it('include 50 ms', () => {
          expect((console.info as any).mock.calls[0][2]).toMatch('50 ms');
        });
      });
    }
  });
});
