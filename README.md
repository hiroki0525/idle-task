# idle-task

![idle-task](https://user-images.githubusercontent.com/40714517/202905619-b2319b98-d81a-4cc2-9eac-c88702daf45b.png)

[![npm version](https://badge.fury.io/js/idle-task.svg)](https://badge.fury.io/js/idle-task)
[![Test](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml/badge.svg)](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Improve your website performance by executing JavaScript during a browser's idle periods.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [`setIdleTask`](#setidletask)
    - [`priority?: 'low' | 'high'`](#priority-low--high)
    - [`cache?: boolean`](#cache-boolean)
  - [`waitForIdleTask`](#waitforidletask)
    - [`cache?: boolean`](#cache-boolean-1)
    - [`timeout?: number`](#timeout-number)
  - [`getResultFromIdleTask`](#getresultfromidletask)
  - [`cancelIdleTask`](#cancelidletask)
  - [`cancelAllIdleTasks`](#cancelallidletasks)
  - [`isRunIdleTask`](#isrunidletask)
  - [`configureIdleTask`](#configureidletask)
    - [`interval?: number`](#interval-number)
    - [`debug?: boolean`](#debug-boolean)
- [Recipe](#recipe)
  - [Vanilla JS](#vanilla-js)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```shell
npm i idle-task
```

## Usage

The simplest way is to use `setIdleTask` .

```javascript
import { setIdleTask } from 'idle-task';

const sendAnalyticsData = () =>
        console.log("send analytics data during a browser's idle periods.");
setIdleTask(sendAnalyticsData);
```

If you want to get the result of a task, please use `waitForIdleTask` .

```typescript
const checkAccessTokenWhenIdle = (accessToken: string): Promise<any> => {
    const fetchCheckAccessToken = async (): Promise<any> => {
        const response = await fetch(`https://yourdomain/api/check?accessToken=${accessToken}`);
        return response.json();
    };
    const taskId = setIdleTask(fetchCheckAccessToken);
    return waitForIdleTask(taskId);
}

const { isSuccess } = await checkAccessTokenWhenIdle('1234');
```

## API

### `setIdleTask`

```javascript
const sendAnalyticsData = () => console.log("send analytics data");
const options = {
    priority: 'high',
    cache: false
};
const taskId = setIdleTask(sendAnalyticsData, options);
```

`idle-task` has a FIFO(First-In-First-Out) queue.

`setIdleTask` enqueues a task which `idle-task` will dequeue and run when the browser is idle.

`setIdleTask` returns task id which is necessary for `cancelIdleTask` , `isRunIdleTask` and `waitForIdleTask`.

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .
If you want to know how long did it take to finish a task, please use [debug mode](#debug-boolean) .

`setIdleTask` can also be set options as below.

#### `priority?: 'low' | 'high'`

You can run a task preferentially using `priority: 'high'` (default is `false`) option.
`setIdleTask` adds it to the head of the queue.

#### `cache?: boolean`

This option is to improve performance.

**`idle-task` caches the results of tasks by default** .

I recommend to set `false` if you don't need the result of idle task.

`waitForIdleTask` will return `undefined` when `cache` is `false` .

```typescript
import {waitForIdleTask} from "idle-task";

const sendAnalyticsData = (): void => {
    console.log("send analytics data")
};
// Recommend: sendAnalyticsData result is not needed
setIdleTask(sendAnalyticsData, {cache: false});

const generateRandomNumber = () => Math.floor(Math.random() * 100);
const taskId = setIdleTask(generateRandomNumber, {cache: false});
// result is undefined
const result = await waitForIdleTask(taskId);
```

### `waitForIdleTask`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskId = setIdleTask(generateRandomNumber);
const randomNumber = await waitForIdleTask(taskId, {
    cache: false
});
```

You can get the result of the task by using `waitForIdleTask` .

`waitForIdleTask` can also be set options as below.

#### `cache?: boolean`

**`idle-task` caches the results of tasks by default** .

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskId = setIdleTask(generateRandomNumber);
const firstRandomNumber = await waitForIdleTask(taskId);
// this result from cache
const secondRandomNumber = await waitForIdleTask(taskId);
// same objects
console.log(Object.is(firstRandomNumber, secondRandomNumber));
// => true
```

If you get the result of a task **only once**, please set `{ cache: false }` .
This will improve memory in JavaScript.

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskId = setIdleTask(generateRandomNumber);
// delete cache
const firstRandomNumber = await waitForIdleTask(taskId, { cache: false });
// this is undefined
const secondRandomNumber = await waitForIdleTask(taskId);
// not same objects
console.log(Object.is(firstRandomNumber, secondRandomNumber));
// => false
```

#### `timeout?: number`

`waitForIdleTask` maybe wait for the task eternally because it will be finished when the browser is idle.
`timeout` option can prevent it.

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskId = setIdleTask(generateRandomNumber);
try {
    const firstRandomNumber = await waitForIdleTask(taskId, { timeout: 1000 });
} catch (e) {
    if (e instanceof WaitForIdleTaskTimeoutError) {
        console.error('this is timeout error')
    }
}
```

In this case, `waitForIdleTask` will throw `WaitForIdleTaskTimeoutError` if the task can't be finished within 1000 ms.

### `getResultFromIdleTask`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const randomNumber = await getResultFromIdleTask(generateRandomNumber, {
    priority: 'high',
    timeout: 3000,
});

// same
const taskId = setIdleTask(generateRandomNumber, { priority: 'high' });
const randomNumber = await waitForIdleTask(taskId, { timeout: 3000, cache: false });
```

You can get the result by using `getResultFromIdleTask` if you don't need the task id.

`getResultFromIdleTask` can also be set options which is `SetIdleTaskOptions.priority` and  `WaitForIdleTaskOptions.timeout` .

### `cancelIdleTask`

```javascript
const taskId = setIdleTask(() => console.log("task will be canceled."));
cancelIdleTask(taskId);
```

You can stop to run a task by using `cancelIdleTask` if it is not executed.

### `cancelAllIdleTasks`

```javascript
setIdleTask(() => console.log("task 1 will be canceled."));
setIdleTask(() => console.log("task 2 will be canceled."));
setIdleTask(() => console.log("task 3 will be canceled."));
cancelAllIdleTasks();
```

You can stop to run all tasks by using `cancelAllIdleTasks` if they are not executed.

### `isRunIdleTask`

```javascript
const taskId = setIdleTask(() => console.log("task"));
const isRun = isRunIdleTask(taskId);
if (isRun) {
  console.log("the task was completed");
}
```

You can know whether the task is executed or not by using `isRunIdleTask` .

### `configureIdleTask`

```javascript
configureIdleTask({
  interval: 1000 // ms
});
```

`configureIdleTask` configures `idle-task` .
You can set properties as below.

#### `interval?: number`

`idle-task` checks tasks which was registered by `setIdleTask` during a browser's idle periods, so **they will not always be executed** . 

Please set `interval` if you want to guarantee to run tasks as much as possible.

Even if the browser is not idle, `idle-task` checks tasks every 1000 ms when `interval` is `1000` and **will execute tasks without negative impact on performance**.

#### `debug?: boolean`

If `debug` is `true`, you can know how long did it take to finish the task via the web console.

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .

The default is `process.env.NODE_ENV === 'development'` .

## Recipe

### Vanilla JS

```javascript
import { getResultFromIdleTask, setIdleTask } from 'idle-task';

const button = document.getElementById('button');
button.addEventListener('click', async () => {
    const { default: sendAnalyticsData } = await getResultFromIdleTask(() => import('./sendAnalyticsData'));
    setIdleTask(sendAnalyticsData, { cache: false });
})
```

## License

Released under the MIT license.
