import type { IdleTaskStatus } from '../api/getIdleTaskStatus';
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
      const taskKey = idleTaskModule!.setIdleTask(createTask());
      runRequestIdleCallback();
      idleTaskModule!.cancelIdleTask(taskKey);
      result = idleTaskModule!.getIdleTaskStatus(taskKey);
    });

    it('to be unknown', () => {
      expect(result).toBe('unknown');
    });
  });
});
