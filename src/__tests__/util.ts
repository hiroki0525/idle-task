export let idleTaskModule: typeof import('../index') | null = null;

export const requestIdleCallbackImpl =
  (didTimeout = false) =>
  (
    cb: IdleRequestCallback,
    _options?: IdleRequestOptions
  ): ReturnType<typeof setTimeout> => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout,
        timeRemaining: () =>
          didTimeout ? 0 : Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1);
  };

export const mockRequestIdleCallback = jest
  .fn()
  .mockImplementation(requestIdleCallbackImpl());

export const mockCancelIdleCallback = jest
  .fn()
  .mockImplementation(clearTimeout);

export const mockFirstTask = jest
  .fn()
  .mockImplementation(() => 'mockFirstTask');
export const mockSecondTask = jest
  .fn()
  .mockImplementation(() => 'mockSecondTask');
export const mockThirdTask = jest
  .fn()
  .mockImplementation(() => 'mockThirdTask');

export const createTask =
  (mockFunction?: () => any, time = 0) =>
  () => {
    if (mockFunction) {
      jest.advanceTimersByTime(time);
      return mockFunction();
    }
  };

export const runRequestIdleCallback = () => {
  jest.advanceTimersByTime(1);
};

export const reloadModule = async () => {
  idleTaskModule = await import('../index');
};
