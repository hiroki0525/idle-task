# idle-task

Improve your website performance by executing JavaScript during a browser's idle periods.

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

## API

### `setIdleTask`

```javascript
const sendAnalyticsData = () => console.log("send analytics data");
const options = {
    priority: 'high'
};
const taskId = setIdleTask(sendAnalyticsData, options);
```

`idle-task` has FIFO queue.

`setIdleTask` enqueues a task which will be executed during a browser's idle periods.

When the browser is idle, `idle-task` will dequeue a task and run it.

You can run a task preferentially using `priority: 'high'` (default is `false`) option.
`setIdleTask` adds it to the head of the queue.

`setIdleTask` returns task id which is necessary for `cancelIdleTask` and `isRunIdleTask` .

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .
If you want to know how long did it take to finish a task, please use [debug mode](#debug-boolean) .

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

#### interval?: number

`idle-task` checks tasks which was registered by `setIdleTask` **during a browser's idle periods, so they will not always be executed** . 

Please set `interval` if you want to guarantee to run tasks as much as possible.

Even if the browser is not idle, `idle-task` checks tasks every 1000 ms when `interval` is `1000` and **will execute tasks without negative impact on performance**.

#### debug?: boolean

If `debug` is `true`, you can know how long did it take to finish the task via the web console.

I recommend less than **50 ms** to execute a task because of [RAIL model](https://web.dev/i18n/en/rail/) .

The default is `process.env.NODE_ENV === 'development'` .

## License

Released under the MIT license.
