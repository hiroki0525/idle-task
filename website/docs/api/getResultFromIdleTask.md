---
sidebar_position: 3
---

# getResultFromIdleTask

You can get the result of the task.

```javascript
const result = await getResultFromIdleTask(func, options);
```

## Usage

```javascript
import { getResultFromIdleTask } from 'idle-task';

const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const randomNumber = await getResultFromIdleTask(generateRandomNumber, {
    priority: 'high',
    taskName: 'generateRandomNumber',
    timeout: 3000,
    timeoutStrategy: 'error'
});
```

:::tip
This is same as belows.
```javascript
const taskKey = setIdleTask(generateRandomNumber, { priority: 'high', taskName: 'generateRandomNumber'})
const randomNumber = await waitForIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'error' });
```
:::

You can get the result by using `getResultFromIdleTask` if you don't need the task key which is created by `setIdleTask`.

`getResultFromIdleTask` can also be set options which is `SetIdleTaskOptions.priority` , `SetIdleTaskOptions.taskName` , `WaitForIdleTaskOptions.timeout` and `WaitForIdleTaskOptions.timeoutStrategy`.

### Parameters

- `func`: The function which you want to run when the browser is idle.
- **optional** `options`: The options are `SetIdleTaskOptions.priority` and  `WaitForIdleTaskOptions.timeout`.

### Returns

The Promise result of the `func`.
