import {
  createTask,
  idleTaskModule,
  mockFirstTask,
  mockSecondTask,
  mockThirdTask,
  runRequestIdleCallback,
} from './util';

describe('cancelIdleTask', () => {
  let taskId: number;

  describe('existed task', () => {
    beforeEach(() => {
      taskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
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

    it('first task result is cleared', () => {
      expect(idleTaskModule!.waitForIdleTask(taskId)).resolves.toBeUndefined();
    });
  });

  describe('not existed task', () => {
    beforeEach(() => {
      taskId = idleTaskModule!.setIdleTask(createTask(mockFirstTask));
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

    it('first task result is cleared', () => {
      expect(idleTaskModule!.waitForIdleTask(taskId)).resolves.toBeUndefined();
    });
  });
});
