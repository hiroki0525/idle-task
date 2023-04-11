---
sidebar_position: 4
---

# forceRunIdleTask

You can get the result immediately whether the task was executed during a browser's idle periods or not.

`forceRunIdleTask` gets result from cache if the task was executed.

```javascript
const result = await forceRunIdleTask(taskKey);
```

## Usage

```javascript
import { forceRunIdleTask } from 'idle-task';

const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const taskKey = setIdleTask(generateRandomNumber);
const randomNumber = await forceRunIdleTask(taskKey);
```

### Parameters

- `taskKey`: Object which `setIdleTask` returns.

### Returns

The Promise result of the function which is registered by `setIdleTask`.
