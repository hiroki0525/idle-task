---
slug: /
sidebar_position: 1
---

# Introduction

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

## Install

```bash
npm i idle-task
```

```bash
yarn add idle-task
```

```bash
pnpm add idle-task
```

You can also use CDN.

```html
<script crossorigin src="https://unpkg.com/idle-task/dist/index.umd.js"></script>
```

## Quick Start

The simplest way is to use `setIdleTask` .

```javascript
import { setIdleTask } from 'idle-task';

const sendAnalyticsData = () =>
        console.log("send analytics data during a browser's idle periods.");
setIdleTask(sendAnalyticsData);
```

If you want to get the result of a task, please use `getResultFromIdleTask` .

```javascript
import { getResultFromIdleTask } from 'idle-task';

const generateRandomNumber = () => Math.floor( Math.random() * 100 );
const result = await getResultFromIdleTask(generateRandomNumber);
```
