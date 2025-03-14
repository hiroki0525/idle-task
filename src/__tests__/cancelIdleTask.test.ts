import type { IdleTaskKey } from '../api/setIdleTask';
import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';

describe('cancelIdleTask', () => {
  let taskKey: IdleTaskKey;

  describe('existed tasks', () => {
    describe('one task is canceled', () => {
      beforeEach(() => {
        taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskKey);
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

      it('first task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(taskKey)
        ).resolves.toBeUndefined();
      });
    });

    describe('two tasks are canceled', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask, 50));
        taskKey = idleTaskModule!.setIdleTask(createTask(mockSecondTask), {
          revalidateInterval: 50,
        });
        // mockFirstTask will be executed and 2 mockSecondTask will be remaining.
        runRequestIdleCallback();
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskKey);
        runRequestIdleCallback();
      });

      it('first task is called', () => {
        expect(mockFirstTask.mock.calls.length).toBe(1);
      });

      it('second task is not called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(0);
      });

      it('third task is called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(1);
      });

      it('second task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(taskKey)
        ).resolves.toBeUndefined();
      });
    });

    describe('one task is not canceled and others is canceled', () => {
      beforeEach(() => {
        idleTaskModule!.setIdleTask(createTask(mockFirstTask, 50));
        taskKey = idleTaskModule!.setIdleTask(createTask(mockSecondTask, 50), {
          revalidateInterval: 50,
        });
        // mockFirstTask will be executed and 2 mockSecondTask will be remaining.
        runRequestIdleCallback();
        // one mockSecondTask will be executed and 2 mockSecondTask will be remaining.
        runRequestIdleCallback();
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskKey);
        runRequestIdleCallback();
        // check whether revalidateInterval worked or not
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

      it('second task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(taskKey)
        ).resolves.toBeUndefined();
      });
    });
  });

  describe('not existed tasks', () => {
    describe('with SetIdleTaskOption.revalidateInterval', () => {
      beforeEach(() => {
        taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask), {
          revalidateInterval: 1,
        });
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        // one mockFirstTask will be remaining.
        runRequestIdleCallback();
        idleTaskModule!.cancelIdleTask(taskKey);
        // One remaining mockFirstTask will be executed.
        runRequestIdleCallback();
        // check not to work revalidateInterval option.
        runRequestIdleCallback();
      });

      it('first task is called twice', () => {
        expect(mockFirstTask.mock.calls.length).toBe(2);
      });

      it('second task is called', () => {
        expect(mockSecondTask.mock.calls.length).toBe(1);
      });

      it('third task is not called', () => {
        expect(mockThirdTask.mock.calls.length).toBe(1);
      });

      it('first task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(taskKey)
        ).resolves.toBeUndefined();
      });
    });

    describe('without SetIdleTaskOption.revalidateInterval', () => {
      beforeEach(() => {
        taskKey = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
        runRequestIdleCallback();
        idleTaskModule!.setIdleTask(createTask(mockSecondTask));
        idleTaskModule!.setIdleTask(createTask(mockThirdTask));
        idleTaskModule!.cancelIdleTask(taskKey);
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

      it('first task result is cleared', async () => {
        await expect(
          idleTaskModule!.waitForIdleTask(taskKey)
        ).resolves.toBeUndefined();
      });
    });
  });
});
