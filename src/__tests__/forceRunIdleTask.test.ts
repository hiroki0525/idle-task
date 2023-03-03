import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';
import { IdleTaskKey } from '../internals';

describe('forceRunIdleTask', () => {
  let taskKey: IdleTaskKey | null;
  let firstResult: Promise<any>;
  let secondResult: Promise<any>;

  describe('not existed task', () => {
    beforeEach(async () => {
      taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      runRequestIdleCallback();
      firstResult = await idleTaskModule!.forceRunIdleTask(taskKey);
      secondResult = await idleTaskModule!.forceRunIdleTask(taskKey);
    });

    it('task is called once', () => {
      expect(mockFirstTask.mock.calls.length).toBe(1);
    });

    it('first result is string', () => {
      expect(firstResult).toBe('mockFirstTask');
    });

    it('second result is string', () => {
      expect(secondResult).toBe('mockFirstTask');
    });
  });

  describe('existed one task', () => {
    describe('without revalidateWhenExecuted', () => {
      beforeEach(async () => {
        taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        firstResult = await idleTaskModule!.forceRunIdleTask(taskKey);
        secondResult = await idleTaskModule!.forceRunIdleTask(taskKey);
      });

      it('task is called once', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('first result is string', () => {
        expect(firstResult).toBe('mockFirstTask');
      });

      it('second result is string', () => {
        expect(secondResult).toBe('mockFirstTask');
      });
    });
    describe('with revalidateWhenExecuted', () => {
      beforeEach(async () => {
        taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask), {
          revalidateWhenExecuted: true,
        });
        firstResult = await idleTaskModule!.forceRunIdleTask(taskKey);
        secondResult = await idleTaskModule!.forceRunIdleTask(taskKey);
      });

      it('task is called twice', () => {
        expect(mockFirstTask.mock.calls.length).toBe(2);
      });

      it('first result is string', () => {
        expect(firstResult).toBe('mockFirstTask');
      });

      it('second result is string', () => {
        expect(secondResult).toBe('mockFirstTask');
      });
    });
  });

  describe('existed tasks', () => {
    beforeEach(async () => {
      idleTaskModule!.setIdleTask(createTask(mockSecondTask, 50));
      taskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask), {
        revalidateInterval: 50,
      });
      // 2 mockTargetTask will be remaining
      runRequestIdleCallback();
      firstResult = await idleTaskModule!.forceRunIdleTask(taskKey);
      secondResult = await idleTaskModule!.forceRunIdleTask(taskKey);
    });

    it('task is called once', () => {
      expect(mockThirdTask.mock.calls.length).toBe(1);
    });

    it('first result is string', () => {
      expect(firstResult).toBe('mockThirdTask');
    });

    it('second result is string', () => {
      expect(secondResult).toBe('mockThirdTask');
    });
  });
});
