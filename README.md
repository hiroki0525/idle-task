# idle-task

![idle-task](https://user-images.githubusercontent.com/40714517/202905619-b2319b98-d81a-4cc2-9eac-c88702daf45b.png)

[![npm version](https://badge.fury.io/js/idle-task.svg)](https://badge.fury.io/js/idle-task)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/idle-task)](https://bundlephobia.com/package/idle-task)
[![Test](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml/badge.svg)](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-commitlint_conventional-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Improve your website performance by executing JavaScript during a browser's idle periods.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Features](#features)
  - [Manage tasks priority](#manage-tasks-priority)
  - [Get result by using Promise based API](#get-result-by-using-promise-based-api)
  - [Cache](#cache)
  - [Optimize executing tasks](#optimize-executing-tasks)
  - [Analyze tasks execution time](#analyze-tasks-execution-time)
- [Install](#install)
- [Quick Start](#quick-start)
- [API](#api)
  - [`setIdleTask`](#setidletask)
    - [`priority?: 'low' | 'high'`](#priority-low--high)
    - [`revalidateInterval?: number`](#revalidateinterval-number)
    - [`revalidateWhenExecuted?: boolean`](#revalidatewhenexecuted-boolean)
    - [`overwriteTask?: IdleTaskKey`](#overwritetask-idletaskkey)
  - [`waitForIdleTask`](#waitforidletask)
    - [`timeout?: number`](#timeout-number)
    - [`timeoutStrategy?: 'error' | ’forceRun'`](#timeoutstrategy-error--forcerun)
  - [`getResultFromIdleTask`](#getresultfromidletask)
  - [`forceRunIdleTask`](#forcerunidletask)
  - [`cancelIdleTask`](#cancelidletask)
  - [`cancelAllIdleTasks`](#cancelallidletasks)
  - [`getIdleTaskStatus`](#getidletaskstatus)
  - [`configureIdleTask`](#configureidletask)
    - [`interval?: number`](#interval-number)
    - [`debug?: boolean`](#debug-boolean)
    - [`timeout?: number`](#timeout-number-1)
    - [`timeoutStrategy?: 'error' | ’forceRun'`](#timeoutstrategy-error--forcerun-1)
- [Recipes](#recipes)
  - [Vanilla JS](#vanilla-js)
    - [dynamic import](#dynamic-import)
    - [fetch external resources](#fetch-external-resources)
  - [React](#react)
    - [fetch external resources](#fetch-external-resources-1)
    - [React.lazy](#reactlazy)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

`idle-task` wraps [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) .

The features are as follows.

### Manage tasks priority

```javascript
import { setIdleTask } from 'idle-task';
setIdleTask(yourLowPrioryFunction, { priority: 'low' });
setIdleTask(yourHighPrioryFunction, { priority: 'high' });
```

### Get result by using Promise based API

```javascript
import { getResultFromIdleTask } from 'idle-task';
// get result asynchronously
const result = await getResultFromIdleTask(yourFunction);
```

### Cache

```javascript
import { setIdleTask, waitForIdleTask } from 'idle-task';
const taskKey = setIdleTask(yourFunction);
const result1 = await waitForIdleTask(taskKey);
// from cache
const result2 = await waitForIdleTask(taskKey);
```

### Optimize executing tasks

```javascript
import { setIdleTask } from 'idle-task';
setIdleTask(longTask);
// these functions will be executed during next browser's idle time.
setIdleTask(shortTask);
setIdleTask(shortTask);
```

### Analyze tasks execution time

```javascript
import { setIdleTask, configureIdleTask } from 'idle-task';
configureIdleTask({ debug: true })
// output the execution time to the web console.
setIdleTask(yourFunction1);
```

## Install

```shell
npm i idle-task
```

## Quick Start

The simplest way is to use `setIdleTask` .

```javascript
import { setIdleTask } from 'idle-task';

const sendAnalyticsData = () =>
        console.log("send analytics data during a browser's idle periods.");
setIdleTask(sendAnalyticsData);
```

If you want to get the result of a task, please use `waitForIdleTask` .

```javascript
import { setIdleTask, waitForIdleTask } from 'idle-task';

const taskKey = setIdleTask(yourFunction);
const result = await waitForIdleTask(taskKey);
```

## API

### `setIdleTask`

```javascript
const sendAnalyticsData = () => console.log("send analytics data");
const options = {
    priority: 'high',
    revalidateInterval: 5000,
    revalidateWhenExecuted: true,
};
const taskKey = setIdleTask(sendAnalyticsData, options);
```

`idle-task` has a FIFO(First-In-First-Out) queue.

`setIdleTask` enqueues a task which `idle-task` will dequeue and run when the browser is idle.

`setIdleTask` returns `TaskKey` Object which is necessary for `cancelIdleTask` , `getIdleTaskStatus` and `waitForIdleTask`.

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .
If you want to know how long did it take to finish a task, please use [debug mode](#debug-boolean) .

`setIdleTask` can also be set options as below.

#### `priority?: 'low' | 'high'`

You can run a task preferentially using `priority: 'high'` (default is `low`) option.
`setIdleTask` adds it to the head of the queue.

#### `revalidateInterval?: number`

You can reregister your task by using `revalidateInterval` .

If you set `revalidateInterval: 5000` , `idle-task` will enqueue your task every 5000 ms .

```typescript
const saveUserArticleDraft = () => {
    // save user editing article data to database.
}

// saveUserArticleDraft will be executed when the browser is idle.
// In addition, idle-task registers saveUserArticleDraft task every 5000 ms.
setIdleTask(saveUserArticleDraft, { revalidateInterval: 5000 });
```

#### `revalidateWhenExecuted?: boolean`

You can reregister your task by using `revalidateWhenExecuted` which default is `false`.

`idle-task` will enqueue your task when it had been executed.

```typescript
const saveUserArticleDraft = () => {
    // save user editing article data to database.
}

// saveUserArticleDraft will be executed when the browser is idle.
// In addition, idle-task registers saveUserArticleDraft task when it had been executed.
setIdleTask(saveUserArticleDraft, { revalidateWhenExecuted: true });
```

#### `overwriteTask?: IdleTaskKey`

You can overwrite registered task by using `overwriteTask`.

If the task have already been executed, `idle-task` remove its result from the cache and enqueue the new task, otherwise `idle-task` will remove it from the queue and enqueue the new task.

```typescript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );

const taskKey = setIdleTask(generateRandomNumber);
const randomNumber1 = await waitForIdleTask(taskKey);

setIdleTask(generateRandomNumber, { overwriteTask: taskKey });
const randomNumber2 = await waitForIdleTask(taskKey);
```

### `waitForIdleTask`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
const randomNumber = await waitForIdleTask(taskKey);
```

You can get the result of the task by using `waitForIdleTask` .

`waitForIdleTask` can also be set options as below.

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

### `getResultFromIdleTask`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const randomNumber = await getResultFromIdleTask(generateRandomNumber, {
    priority: 'high',
    timeout: 3000,
    timeoutStrategy: 'error'
});

// same
const taskKey = setIdleTask(generateRandomNumber, { priority: 'high' });
const randomNumber = await waitForIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'error' });
```

You can get the result by using `getResultFromIdleTask` if you don't need the task id.

`getResultFromIdleTask` can also be set options which is `SetIdleTaskOptions.priority` and  `WaitForIdleTaskOptions.timeout` .

### `forceRunIdleTask`

```javascript
const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
const randomNumber = await forceRunIdleTask(taskKey);
```

You can get the result immediately whether the task was executed during a browser's idle periods or not.

`forceRunIdleTask` gets result from cache if the task was executed.

### `cancelIdleTask`

```javascript
const taskKey = setIdleTask(() => console.log("task will be canceled."));
cancelIdleTask(taskKey);
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

### `getIdleTaskStatus`

```javascript
const taskKey = setIdleTask(() => console.log("task"));
const idleTaskStatus = getIdleTaskStatus(taskKey);
// execute immediately if the task has not been executed yet.
if (idleTaskStatus === 'ready') {
  forceRunIdleTask(taskKey)
}
```

You can know the task status by using `getIdleTaskStatus` .

`getIdleTaskStatus` returns string as following.

- `ready`
  - The task has not been executed.
- `executed`
  - The task has been executed.
  - **This doesn't mean that the task has been completed** because JavaScript don't have API which help us to know the promise result like `fullfilled` .
- `unknown`
  - `idle-task` doesn't know the task status because its result doesn't exist anywhere.
  - This case means that the task was canceled by API like `cancelIdleTask` .

### `configureIdleTask`

```javascript
configureIdleTask({
  interval: 1000, // ms
  debug: process.env.NODE_ENV === 'development',
  timeout: 3000,
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

The default is `false` .

#### `timeout?: number`

This option configures `timeout` of `waitForIdleTask` and `getResultFromIdleTask` as **default** setting.

```javascript
configureIdleTask({ timeout: 3000 });

const taskKey = setIdleTask(yourFunction);
// timeout is 3000
const result = await waitForIdleTask(taskKey);

// timeout is 5000 if you set timeout as option
const result = await waitForIdleTask(taskKey, { timeout: 5000 });
```

#### `timeoutStrategy?: 'error' | ’forceRun'`

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

## Recipes

### Vanilla JS

#### dynamic import

```javascript
import { setIdleTask } from 'idle-task';

// this module is loaded during a browser's idle periods because it is not important for UI.
const taskKey = setIdleTask(() => import('./sendAnalyticsData'))

const button = document.getElementById('button');
button.addEventListener('click', async () => {
    // You should use waitForIdleTask if the module is not important.
    // On the other hand, I recommend to use forceRunIdleTask if the module is important. 
    const { default: sendAnalyticsData } = await waitForIdleTask(taskKey);
    // Send analytics data to server when the browser is idle.
    setIdleTask(sendAnalyticsData);
})
```

#### fetch external resources

```typescript
import { getResultFromIdleTask } from 'idle-task';

const checkAccessTokenWhenIdle = (accessToken: string): Promise<any> => {
    const fetchCheckAccessToken = async (): Promise<any> => {
        const response = await fetch(`https://yourdomain/api/check?accessToken=${accessToken}`);
        // Promise callback will execute immediately after fetching completely even if the browser is busy.
        // One of the solutions is to run it when next browser's idle time.
        return getResultFromIdleTask(() => response.json());
    };
    return getResultFromIdleTask(fetchCheckAccessToken);
}

const { isSuccess } = await checkAccessTokenWhenIdle('1234');
```

### React

#### fetch external resources

```jsx
import {useState, useEffect} from 'react';
import {setIdleTask, cancelIdleTask, waitForIdleTask} from 'idle-task';

const fetchNewsList = async () => {
  const response = await fetch('https://yourdomain/api/news');
  return response.json();
}

// this is not important UI for the website main content like e-commerce sites.
export default function WebsiteNewsList() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch news list when the browser is idle and cache it.
    const taskKey = setIdleTask(fetchNewsList)
    waitForIdleTask(taskKey)
        .then(setNewsList)
        .finally(() => setIsLoading(false));
    return () => {
        // stop to fetch news list and remove the cache when the component re-render.
        cancelIdleTask(taskKey)
    };
  }, [])
  
  if (isLoading) {
      return <div>Loading...</div>
  }
  return newsList.map(news => (
      <div id={news.id}>
        {news.publiedDate}
        {news.title}
        {news.description}
      </div>
  ))
}
```

#### React.lazy

```jsx
import {useState, useEffect, lazy, Suspense} from 'react';
import {setIdleTask, waitForIdleTask, forceRunIdleTask} from 'idle-task';

const taskKey = setIdleTask(() => import('~/components/Modal'))
const taskPromise = waitForIdleTask(taskKey)
const Modal = lazy(() => taskPromise);

export default function WebsiteNewsList() {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = () => setIsClicked(true);

  useEffect(() => {
    if (isClicked) {
      // Import Modal immediately whether importing it was completed during the browser's idle periods or not.
      forceRunIdleTask(taskKey);
    }
  }, [isClicked])

  return (
      <>
        <button type='button' onClick={onClick} />
        <Suspense>
          {isClicked && <Modal />}
        </Suspense>
      </>
  )
}
```

## Contributing

Please see [CONTRIBUTING.md](https://github.com/hiroki0525/idle-task/blob/main/CONTRIBUTING.md) .

Thank you for contributing!!

[@joeinnes](https://github.com/joeinnes)
[@m5r](https://github.com/m5r)
[@yuchi](https://github.com/yuchi)

## License

Released under the MIT license.
