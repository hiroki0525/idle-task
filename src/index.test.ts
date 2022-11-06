/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('idle-task', () => {
  let idleTaskModule: typeof import('./index') | null = null;
  const requestIdleCallbackImpl =
    (didTimeout = false) =>
    (cb: IdleRequestCallback, _options?: IdleRequestOptions): number => {
      const start = Date.now();
      return window.setTimeout(function () {
        cb({
          didTimeout,
          timeRemaining: function () {
            return didTimeout ? 0 : Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };

  const mockRequestIdleCallback = jest
    .fn()
    .mockImplementation(requestIdleCallbackImpl());
  window.requestIdleCallback = mockRequestIdleCallback;
  const mockCancelIdleCallback = jest
    .fn()
    .mockImplementation(id => window.clearTimeout(id));
  window.cancelIdleCallback = mockCancelIdleCallback;

  const mockFirstTask = jest.fn();
  const mockSecondTask = jest.fn();
  const mockThirdTask = jest.fn();

  const createTask =
    (mockFunction?: jest.Mock, time = 0) =>
    () => {
      if (mockFunction) {
        mockFunction();
        jest.advanceTimersByTime(time);
      }
    };

  const runRequestIdleCallback = () => {
    jest.advanceTimersByTime(1);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    import('./index').then(module => {
      idleTaskModule = module;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.resetModules();
    jest.useRealTimers();
    idleTaskModule = null;
  });

  describe('configureIdleTask', () => {
    describe('not called configure', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask());
        runRequestIdleCallback();
      });

      it('requestIdleCallback called without option', () => {
        expect(mockRequestIdleCallback.mock.calls[0][1]).toStrictEqual({
          timeout: undefined,
        });
      });
    });

    describe('called configure', () => {
      const expectedTimeout = 1000;

      beforeEach(() => {
        idleTaskModule!.configureIdleTask({ interval: expectedTimeout });
        idleTaskModule!.setIdleTask(createTask());
        runRequestIdleCallback();
      });

      it('requestIdleCallback called with option', () => {
        expect(mockRequestIdleCallback.mock.calls[0][1]).toStrictEqual({
          timeout: expectedTimeout,
        });
      });
    });
  });

  describe('setIdleTask', () => {
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

      beforeEach(() => {
        window.requestIdleCallback = mockRequestIdleCallbackDidTimeout;
      });

      afterEach(() => {
        window.requestIdleCallback = mockRequestIdleCallback;
      });

      describe('executed time is less than 50ms', () => {
        beforeEach(() => {
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
  });

  describe('cancelIdleTask', () => {
    describe('existed task', () => {
      beforeEach(() => {
        const taskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskId);
        runRequestIdleCallback();
      });

      it('first task is not called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(0);
      });

      it('second task is called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(1);
      });

      it('third task is called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(1);
      });
    });

    describe('not existed task', () => {
      beforeEach(() => {
        const taskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        runRequestIdleCallback();
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskId);
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
    });
  });

  describe('cancelAllIdleTasks', () => {
    describe('existed requestIdleCallback id', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelAllIdleTasks();
      });

      it('first task is not called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(0);
      });

      it('second task is not called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(0);
      });

      it('third task is not called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(0);
      });

      it('cancelIdleCallback is called', () => {
        expect(mockCancelIdleCallback.mock.calls.length).toBe(1);
      });
    });

    describe('not existed requestIdleCallback id', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        runRequestIdleCallback();
        idleTaskModule!.cancelAllIdleTasks();
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

      it('cancelIdleCallback is not called', () => {
        expect(mockCancelIdleCallback.mock.calls.length).toBe(0);
      });
    });
  });

  describe('isRunIdleTask', () => {
    let result: boolean;

    describe('is run', () => {
      beforeEach(() => {
        const taskId = idleTaskModule!.setIdleTask(createTask());
        runRequestIdleCallback();
        result = idleTaskModule!.isRunIdleTask(taskId);
      });

      it('to be true', () => {
        expect(result).toBe(true);
      });
    });

    describe('is not run', () => {
      beforeEach(() => {
        const taskId = idleTaskModule!.setIdleTask(createTask());
        result = idleTaskModule!.isRunIdleTask(taskId);
      });

      it('to be false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
