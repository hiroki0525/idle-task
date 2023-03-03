import {
  createTask,
  idleTaskModule,
  mockCancelIdleCallback,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';
import { IdleTaskKey } from '../internals';

describe('cancelAllIdleTasks', () => {
  let firstTaskKey: IdleTaskKey;
  let secondTaskKey: IdleTaskKey;
  let thirdTaskKey: IdleTaskKey;

  describe('existed requestIdleCallback id', () => {
    describe('without revalidateInterval', () => {
      beforeEach(() => {
        firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        secondTaskKey = idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        thirdTaskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelAllIdleTasks();
        // check whether tasks were run or not
        runRequestIdleCallback();
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

      it('first task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskKey)
        ).resolves.toBeUndefined();
      });

      it('second task result is cleared', () => {
        expect(
          idleTaskModule!.waitForIdleTask(secondTaskKey)
        ).resolves.toBeUndefined();
      });

      it('third task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(thirdTaskKey)
        ).resolves.toBeUndefined();
      });
    });

    describe('with revalidateInterval', () => {
      beforeEach(() => {
        firstTaskKey = idleTaskModule!.setIdleTask(
          createTask(mockFirstTask, 50),
          {
            revalidateInterval: 1,
          }
        );
        secondTaskKey = idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        thirdTaskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        // one mockFirstTask will be executed and others will be enqueued
        runRequestIdleCallback();
        idleTaskModule!.cancelAllIdleTasks();
        // check whether tasks were run or not
        runRequestIdleCallback();
        // check whether revalidateInterval worked or not
        runRequestIdleCallback();
      });

      it('first task is called once', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
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

      it('first task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(firstTaskKey)
        ).resolves.toBeUndefined();
      });

      it('second task result is cleared', () => {
        expect(
          idleTaskModule!.waitForIdleTask(secondTaskKey)
        ).resolves.toBeUndefined();
      });

      it('third task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(thirdTaskKey)
        ).resolves.toBeUndefined();
      });
    });
  });

  describe('not existed requestIdleCallback id', () => {
    beforeEach(() => {
      firstTaskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      secondTaskKey = idleTaskModule!.setIdleTask(createTask(mockSecondTask));
      thirdTaskKey = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
      runRequestIdleCallback();
      idleTaskModule!.cancelAllIdleTasks();
      // check whether tasks were run or not
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

    it('cancelIdleCallback is not called', () => {
      expect(mockCancelIdleCallback.mock.calls.length).toBe(0);
    });

    it('first task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(firstTaskKey)
      ).resolves.toBeUndefined();
    });

    it('second task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(secondTaskKey)
      ).resolves.toBeUndefined();
    });

    it('third task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(thirdTaskKey)
      ).resolves.toBeUndefined();
    });
  });
});
