# idle-task

![idle-task](https://user-images.githubusercontent.com/40714517/202905619-b2319b98-d81a-4cc2-9eac-c88702daf45b.png)

[![npm version](https://badge.fury.io/js/idle-task.svg)](https://badge.fury.io/js/idle-task)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/idle-task)](https://bundlephobia.com/package/idle-task)
[![Test](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml/badge.svg)](https://github.com/hiroki0525/idle-task/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-commitlint_conventional-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Improve your website performance by executing JavaScript during a browser's idle periods.

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

## Installation

Please see [installation](https://hiroki0525.github.io/idle-task#installation) .

## API

Please see [API](https://hiroki0525.github.io/idle-task/category/api) .

## Contributing

Please see [CONTRIBUTING.md](https://github.com/hiroki0525/idle-task/blob/main/CONTRIBUTING.md) .

Thank you for contributing!!

[@joeinnes](https://github.com/joeinnes)
[@m5r](https://github.com/m5r)
[@yuchi](https://github.com/yuchi)

## License

Released under the MIT license.
