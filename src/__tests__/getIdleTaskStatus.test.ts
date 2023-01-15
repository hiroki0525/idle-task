import { IdleTaskStatus } from '../api/getIdleTaskStatus';
import { createTask, idleTaskModule, runRequestIdleCallback } from './util';

describe('getIdleTaskStatus', () => {
  let result: IdleTaskStatus;

  describe('is run', () => {
    beforeEach(() => {
      const taskId = idleTaskModule!.setIdleTask(createTask());
      runRequestIdleCallback();
      result = idleTaskModule!.getIdleTaskStatus(taskId);
    });

    it('to be executed', () => {
      expect(result).toBe('executed');
    });
  });

  describe('is not run', () => {
    beforeEach(() => {
      const taskId = idleTaskModule!.setIdleTask(createTask());
      result = idleTaskModule!.getIdleTaskStatus(taskId);
    });

    it('to be ready', () => {
      expect(result).toBe('ready');
    });
  });

  describe('task is canceled', () => {
    beforeEach(() => {
      const taskId = idleTaskModule!.setIdleTask(createTask(), {
        cache: false,
      });
      runRequestIdleCallback();
      result = idleTaskModule!.getIdleTaskStatus(taskId);
    });

    it('to be unknown', () => {
      expect(result).toBe('unknown');
    });
  });

  describe('cache is deleted', () => {
    beforeEach(() => {
      const taskId = idleTaskModule!.setIdleTask(createTask());
      idleTaskModule!.cancelIdleTask(taskId);
      result = idleTaskModule!.getIdleTaskStatus(taskId);
    });

    it('to be unknown', () => {
      expect(result).toBe('unknown');
    });
  });
});
