import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  runRequestIdleCallback,
} from './util';

describe('forceRunIdleTask', () => {
  let taskId: number;
  let result: Promise<any>;
  let secondResult: Promise<any>;

  beforeEach(() => {
    taskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
  });

  describe('not existed task', () => {
    beforeEach(() => {
      runRequestIdleCallback();
    });

    describe('with cache', () => {
      describe('no ForceRunIdleTaskOptions', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId);
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });

      describe('ForceRunIdleTaskOptions.cache is true', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId, {
            cache: true,
          });
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });

      describe('ForceRunIdleTaskOptions.cache is undefined', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId, {});
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });
    });

    describe('without cache', () => {
      beforeEach(async () => {
        result = await idleTaskModule!.forceRunIdleTask(taskId, {
          cache: false,
        });
        secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
      });

      it('task is called once', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('first result is string', () => {
        expect(result).toBe('mockFirstTask');
      });

      it('second result is undefined', () => {
        expect(secondResult).toBeUndefined();
      });
    });
  });

  describe('existed task', () => {
    describe('with cache', () => {
      describe('no ForceRunIdleTaskOptions', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId);
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });

      describe('ForceRunIdleTaskOptions.cache is true', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId, {
            cache: true,
          });
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });

      describe('ForceRunIdleTaskOptions.cache is undefined', () => {
        beforeEach(async () => {
          result = await idleTaskModule!.forceRunIdleTask(taskId, {});
          secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
        });

        it('task is called once', () => {
          expect(mockFirstTask.mock.calls.length).toBe(1);
        });

        it('first result is string', () => {
          expect(result).toBe('mockFirstTask');
        });

        it('second result is string', () => {
          expect(secondResult).toBe('mockFirstTask');
        });
      });
    });

    describe('without cache', () => {
      beforeEach(async () => {
        result = await idleTaskModule!.forceRunIdleTask(taskId, {
          cache: false,
        });
        secondResult = await idleTaskModule!.forceRunIdleTask(taskId);
      });

      it('task is called once', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('first result is string', () => {
        expect(result).toBe('mockFirstTask');
      });

      it('second result is undefined', () => {
        expect(secondResult).toBeUndefined();
      });
    });
  });
});
