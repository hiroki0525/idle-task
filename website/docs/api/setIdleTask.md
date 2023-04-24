---
sidebar_position: 1
---

# setIdleTask

You can register your task which is called when the browser is idle.

```javascript
const taskKey = setIdleTask(func, options);
```

## Usage

```javascript
import { setIdleTask } from 'idle-task';

const sendAnalyticsData = () => console.log("send analytics data");
const options = {
    priority: 'high',
    revalidateInterval: 5000,
    revalidateWhenExecuted: true,
    taskName: 'sendAnalyticsData',
};
const taskKey = setIdleTask(sendAnalyticsData, options);
```

`idle-task` has a FIFO(First-In-First-Out) queue.

`setIdleTask` enqueues a task which `idle-task` will dequeue and run when the browser is idle.

### Parameters

- `func`: The function which you want to run when the browser is idle.

:::tip Recommend

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .
If you want to know how long did it take to finish a task, please use [debug mode](#configureIdleTask) .

:::

- **optional** `options`: The options as follows.

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

#### `taskName?: string`

This is for debugging.

The browser will output the `taskName` to the web console if you set `debug: true` by `configureIdleTask` .

```typescript

### Returns

`TaskKey` Object which is necessary for `cancelIdleTask` , `getIdleTaskStatus` and `waitForIdleTask`.
