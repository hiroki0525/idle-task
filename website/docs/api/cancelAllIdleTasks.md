---
sidebar_position: 6
---

# cancelAllIdleTasks

You can cancel all tasks.

```javascript
cancelAllIdleTasks();
```

## Usage

```javascript
import { setIdleTask, cancelAllIdleTasks } from 'idle-task';

setIdleTask(() => console.log("task 1 will be canceled."));
setIdleTask(() => console.log("task 2 will be canceled."));
setIdleTask(() => console.log("task 3 will be canceled."));
cancelAllIdleTasks();
```

You can stop to run all tasks by using `cancelAllIdleTasks` if they are not executed.

### Parameters

No parameters.

### Returns

No return value.
