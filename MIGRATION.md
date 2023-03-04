# Migration

## From version 3 to 4

Please see https://github.com/hiroki0525/idle-task/issues/62 .

You must change 3 points.

### 1. Remove `cache` option

No longer `cache` option is needed.
`idle-task` manages caches automatically.

```javascript
// Before
setIdleTask(yourFunction, { cache: false });
waitForIdleTask(yourFunction, { cache: true });
forceRunIdleTask(yourFunction, { cache: false });
configureIdleTask({ cache: false, debug: true });

// After
setIdleTask(yourFunction);
waitForIdleTask(yourFunction);
forceRunIdleTask(yourFunction);
configureIdleTask({ debug: true });
```

### 2. Use Object instead of ID

`setIdleTask` returns `IdleTaskKey` Object instead of id.

```typescript
// Before
const taskId: number = setIdleTask(yourFunction);
console.log(taskId); // => 1
waitForIdleTask(taskId);
forceRunIdleTask(taskId);
cancelIdleTask(taskId);

// After 
const taskKey: IdleTaskKey = setIdleTask(yourFunction);
console.log(taskKey); // => { id: 1 }
waitForIdleTask(taskKey);
forceRunIdleTask(taskKey);
cancelIdleTask(taskKey);
```

### 3. `timeoutStrategy` is `forceRun` as default

You no longer set `forceRun` .

```javascript
// Before
configureIdleTask({ timeout: 3000, timeoutStrategy: "forceRun" });
waitForIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'forceRun' });
getResultFromIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'forceRun' });

// After
configureIdleTask({ timeout: 3000 });
waitForIdleTask(taskKey, { timeout: 3000 });
getResultFromIdleTask(taskKey, { timeout: 3000 });
```

If you want to throw Error, please set `error` .

```javascript
try {
    const result = await waitForIdleTask(taskKey, { timeout: 3000, timeoutStrategy: 'error' });
} catch (e) {
    // Error Handling
    console.log('timeout!!');
}
```