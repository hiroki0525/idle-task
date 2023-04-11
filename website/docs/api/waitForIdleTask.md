---
sidebar_position: 2
---

# waitForIdleTask

You can get the result of the task.

```javascript
const result = await waitForIdleTask(taskKey);
```

## Usage

```javascript
import { setIdleTask, waitForIdleTask } from 'setIdleTask';

const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
const randomNumber = await waitForIdleTask(taskKey);
```

### Parameters

- `taskKey`: Object which `setIdleTask` returns.
- **optional** `options`: The options as follows.

#### `timeout?: number`

`waitForIdleTask` maybe wait for the task eternally because it will be finished when the browser is idle.
`timeout` option can prevent it.

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
try {
    const firstRandomNumber = await waitForIdleTask(taskKey, { timeout: 1000 });
} catch (e) {
    if (e instanceof WaitForIdleTaskTimeoutError) {
        console.error('this is timeout error')
    }
}
```

In this case, `waitForIdleTask` will throw `WaitForIdleTaskTimeoutError` as default if the task can't be finished within 1000 ms.

#### `timeoutStrategy?: 'error' | ’forceRun'`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
const firstRandomNumber = await waitForIdleTask(taskKey, { timeout: 1000, timeoutStrategy: 'error' });
```

You can choose the movement when the idle task is timeout.

`waitForIdleTask` executes the task even if having not yet run it after the time has come.

If you set `error`, `waitForIdleTask` throws an error if the task can't be finished within the time which you set.

### Returns

The Promise result of the function which is registered by `setIdleTask`.
