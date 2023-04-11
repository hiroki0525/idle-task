---
sidebar_position: 5
---

# cancelIdleTask

You can cancel the task.

```javascript
cancelIdleTask(taskKey);
```

## Usage

```javascript
import { setIdleTask, cancelIdleTask } from 'idle-task';

const taskKey = setIdleTask(() => console.log("task will be canceled."));
cancelIdleTask(taskKey);
```

You can stop to run a task by using `cancelIdleTask` if it is not executed.

### Parameters

- `taskKey`: Object which `setIdleTask` returns.

### Returns

No return value.
