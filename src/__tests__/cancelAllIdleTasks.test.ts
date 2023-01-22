import {
  createTask,
  idleTaskModule,
  mockCancelIdleCallback,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';

describe('cancelAllIdleTasks', () => {
  let firstTaskId: number;
  let secondTaskId: number;
  let thirdTaskId: number;

  describe('existed requestIdleCallback id', () => {
    beforeEach(() => {
      firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      secondTaskId = idleTaskModule!.setIdleTask(createTask(mockSecondTask));
      thirdTaskId = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
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

    it('first task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(firstTaskId)
      ).resolves.toBeUndefined();
    });

    it('second task result is cleared', () => {
      expect(
        idleTaskModule!.waitForIdleTask(secondTaskId)
      ).resolves.toBeUndefined();
    });

    it('third task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(thirdTaskId)
      ).resolves.toBeUndefined();
    });
  });

  describe('not existed requestIdleCallback id', () => {
    beforeEach(() => {
      firstTaskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
      secondTaskId = idleTaskModule!.setIdleTask(createTask(mockSecondTask));
      thirdTaskId = idleTaskModule!.setIdleTask(createTask(mockThirdTask));
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

    it('first task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(firstTaskId)
      ).resolves.toBeUndefined();
    });

    it('second task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(secondTaskId)
      ).resolves.toBeUndefined();
    });

    it('third task result is cleared', async () => {
      await expect(
        idleTaskModule!.waitForIdleTask(thirdTaskId)
      ).resolves.toBeUndefined();
    });
  });
});
