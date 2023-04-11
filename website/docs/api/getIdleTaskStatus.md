---
sidebar_position: 7
---

# getIdleTaskStatus

You can get the status of the task.

```javascript
getIdleTaskStatus(taskKey);
```

## Usage

```javascript
import { setIdleTask, forceRunIdleTask, getIdleTaskStatus } from 'idle-task';

const taskKey = setIdleTask(() => console.log("task"));
const idleTaskStatus = getIdleTaskStatus(taskKey);
// execute immediately if the task has not been executed yet.
if (idleTaskStatus === 'ready') {
    forceRunIdleTask(taskKey)
}
```

You can know the task status by using `getIdleTaskStatus` .

### Parameters

- `taskKey`: Object which `setIdleTask` returns.

### Returns

String of the task status as follows.

- `ready`
  - The task has not been executed.
- `executed`
  - The task has been executed.
  - **This doesn't mean that the task has been completed** because JavaScript don't have API which help us to know the promise result like `fullfilled` .
- `unknown`
  - `idle-task` doesn't know the task status because its result doesn't exist anywhere.
  - This case means that the task was canceled by API like `cancelIdleTask` .