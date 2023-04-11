---
sidebar_position: 8
---

# configureIdleTask

You can configure `idle-task`.

```javascript
configureIdleTask(options);
```

## Usage

```javascript
import { configureIdleTask } from 'idle-task';

configureIdleTask({
    interval: 1000, // ms
    debug: process.env.NODE_ENV === 'development',
    timeout: 3000,
});
```

`configureIdleTask` configures `idle-task` .

### Parameters

- `options`: The options as follows.

#### interval?: number

`idle-task` checks tasks which was registered by `setIdleTask` during a browser's idle periods, so **they will not always be executed** .

Please set `interval` if you want to guarantee to run tasks as much as possible.

Even if the browser is not idle, `idle-task` checks tasks every 1000 ms when `interval` is `1000` and **will execute tasks without negative impact on performance**.

#### debug?: boolean

If `debug` is `true`, you can know how long did it take to finish the task via the web console.

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .

The default is `false` .

#### timeout?: number

This option configures `timeout` of `waitForIdleTask` and `getResultFromIdleTask` as **default** setting.

```javascript
configureIdleTask({ timeout: 3000 });

const taskKey = setIdleTask(yourFunction);
// timeout is 3000
const result = await waitForIdleTask(taskKey);

// timeout is 5000 if you set timeout as option
const result = await waitForIdleTask(taskKey, { timeout: 5000 });
```

#### timeoutStrategy?: 'error' | ’forceRun'

This option configures `timeoutStrategy` of `waitForIdleTask` and `getResultFromIdleTask` as **default** setting.

```javascript
configureIdleTask({ timeout: 3000, timeoutStrategy: 'forceRun' });

const taskKey = setIdleTask(yourFunction);
// run task in 3000 ms regardless of whether the task has already been executed or not.
const result = await waitForIdleTask(taskKey);

// timeoutStrategy is 'error' if you set timeoutStrategy as option
try {
  const result = await waitForIdleTask(taskKey, { timeoutStrategy: 'error' });  
} catch {
  console.error('timeout!')
}
```

### Returns

No return value.
