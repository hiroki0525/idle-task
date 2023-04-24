# [4.1.0](https://github.com/hiroki0525/idle-task/compare/v4.0.0...v4.1.0) (2023-04-24)


### Features

* add `SetIdleTaskOptions.taskName` ([42a8e1c](https://github.com/hiroki0525/idle-task/commit/42a8e1c0708e13be065ac092e855bc55e4288dcf))

# [4.0.0](https://github.com/hiroki0525/idle-task/compare/v3.4.0...v4.0.0) (2023-03-04)


### Features

* `timeoutStrategy` is `forceRun` as default ([b6520ba](https://github.com/hiroki0525/idle-task/commit/b6520ba340341927faa0ad149f7477ba0f5c415e))
* manage caches automatically ([ed185fd](https://github.com/hiroki0525/idle-task/commit/ed185fd10e7cdcfa7ce14d2a44d794fd7a1c18b8))


### BREAKING CHANGES

* ref https://github.com/hiroki0525/idle-task/issues/61
* ref https://github.com/hiroki0525/idle-task/issues/56

# [3.4.0](https://github.com/hiroki0525/idle-task/compare/v3.3.3...v3.4.0) (2023-02-19)


### Features

* log more information when `debug` mode. See https://github.com/hiroki0525/idle-task/pull/52 ([a752d68](https://github.com/hiroki0525/idle-task/commit/a752d6816f5925ebb92c75d3e6c5965c83049a4d))

## [3.3.3](https://github.com/hiroki0525/idle-task/compare/v3.3.2...v3.3.3) (2023-02-04)


### Bug Fixes

* not working `cancelIdleTask` when setting `SetIdleTaskOptions.revalidateInterval` ([0b4f980](https://github.com/hiroki0525/idle-task/commit/0b4f9806b01be30ed566ef2747a54737450dbcf8))

## [3.3.2](https://github.com/hiroki0525/idle-task/compare/v3.3.1...v3.3.2) (2023-02-02)


### Bug Fixes

* not working `SetIdleTaskOptions.revalidateInterval` ([4ba9c8d](https://github.com/hiroki0525/idle-task/commit/4ba9c8dc86b943f35146cdc208362f73e4c7a7a8))

## [3.3.1](https://github.com/hiroki0525/idle-task/compare/v3.3.0...v3.3.1) (2023-01-22)


### Bug Fixes

* remove timer to reregister task when it was cancelled ([0e3db76](https://github.com/hiroki0525/idle-task/commit/0e3db766b0730b8dd0286d325c2dcbe67560a1e7))

# [3.3.0](https://github.com/hiroki0525/idle-task/compare/v3.2.1...v3.3.0) (2023-01-20)


### Features

* add `SetIdleTaskOptions.revalidateWhenExecuted` ([e8cda02](https://github.com/hiroki0525/idle-task/commit/e8cda02a68c36623145b13a01a178f518aaca90e))

## [3.2.1](https://github.com/hiroki0525/idle-task/compare/v3.2.0...v3.2.1) (2023-01-15)


### Bug Fixes

*  `forceRunIdleTask` executes a latest task considering the case of `revalidateInterval` ([b8fb2a6](https://github.com/hiroki0525/idle-task/commit/b8fb2a69c7c18a355cfad475591fdc5863a85520))

# [3.2.0](https://github.com/hiroki0525/idle-task/compare/v3.1.1...v3.2.0) (2023-01-15)


### Features

* add `SetIdleTaskOptions.revalidateInterval` ([b3139a3](https://github.com/hiroki0525/idle-task/commit/b3139a39d839103361635e9c330b95f01c3d918d))

## [3.1.1](https://github.com/hiroki0525/idle-task/compare/v3.1.0...v3.1.1) (2023-01-10)


### Bug Fixes

* https://github.com/hiroki0525/idle-task/issues/30 ([63ca46f](https://github.com/hiroki0525/idle-task/commit/63ca46f7d34f43c1b4139917dd4e6c88396a72b2))

# [3.1.0](https://github.com/hiroki0525/idle-task/compare/v3.0.0...v3.1.0) (2023-01-08)


### Features

* transpile ES2020 to reduce bundle size for modern browsers ([21cb157](https://github.com/hiroki0525/idle-task/commit/21cb1577c0d28ee5c6571f2a0c6401e7f6ea4b35))

# [3.0.0](https://github.com/hiroki0525/idle-task/compare/v2.15.0...v3.0.0) (2023-01-04)


### Features

* add `getIdleTaskStatus` instead of `isRunIdleTask` ([c907dce](https://github.com/hiroki0525/idle-task/commit/c907dceca4c598c3783e092586f65d55b19a4426))


### BREAKING CHANGES

* `isRunIdleTask` was deleted. Please use `getIdleTaskStatus` if you want to know a task status.

# [2.15.0](https://github.com/hiroki0525/idle-task/compare/v2.14.0...v2.15.0) (2022-12-21)


### Features

* add `"sideEffects": false` to enable tree-shaking ([1dcd30e](https://github.com/hiroki0525/idle-task/commit/1dcd30e4ff0fc7b1a4d1d75b07fc3618fee9a62a))
* support ESM and development packages ([97ac608](https://github.com/hiroki0525/idle-task/commit/97ac608e7469beb0e44f62bb5a248d698108d6a9))
* transpile ES2017 ([23499f5](https://github.com/hiroki0525/idle-task/commit/23499f5d0d0a7039dd03836e473e2de0a316a6cf))
* umd target is es5 ([21e64a1](https://github.com/hiroki0525/idle-task/commit/21e64a13ae2a75d9f43542e33c7e955ec4d663e5))

# [2.14.0](https://github.com/hiroki0525/idle-task/compare/v2.13.0...v2.14.0) (2022-12-17)


### Features

* add support umd for CDN ([8348657](https://github.com/hiroki0525/idle-task/commit/834865729d04c8e6ea8dbaf2fdcfd57bae4d00b1))

# [2.13.0](https://github.com/hiroki0525/idle-task/compare/v2.12.0...v2.13.0) (2022-12-03)


### Bug Fixes

* export `ForceRunIdleTaskOptions` type ([61e5801](https://github.com/hiroki0525/idle-task/commit/61e58016855e9bdf0e99fa5b0469094dca6d7b43))


### Features

* add `GetResultFromIdleTaskOptions.timeoutStrategy` ([bb54945](https://github.com/hiroki0525/idle-task/commit/bb54945300b5a1469ddecd254c00bf834f2a1a74))

# [2.12.0](https://github.com/hiroki0525/idle-task/compare/v2.11.0...v2.12.0) (2022-12-02)


### Features

* add `ConfigureOptions.timeoutStrategy` ([7e32a24](https://github.com/hiroki0525/idle-task/commit/7e32a24773dae5571303815b5a4a3a9d4d3e79d7)), closes [/github.com/hiroki0525/idle-task#timeoutstrategy-error--forcerun-1](https://github.com//github.com/hiroki0525/idle-task/issues/timeoutstrategy-error--forcerun-1)

# [2.11.0](https://github.com/hiroki0525/idle-task/compare/v2.10.1...v2.11.0) (2022-12-01)


### Features

* add `WaitForIdleTaskOptions.timeoutStrategy` ([e2f3925](https://github.com/hiroki0525/idle-task/commit/e2f3925ebc185d58f6e8aa7f3dd20ca104c722ad))

## [2.10.1](https://github.com/hiroki0525/idle-task/compare/v2.10.0...v2.10.1) (2022-11-30)


### Bug Fixes

* avoid to log on the server  because it is unnecessary ([f8295b1](https://github.com/hiroki0525/idle-task/commit/f8295b199a4840081fda174b242cb910566b14cf))

# [2.10.0](https://github.com/hiroki0525/idle-task/compare/v2.9.0...v2.10.0) (2022-11-28)


### Features

* add `forceRunIdleTask` ([01e9b79](https://github.com/hiroki0525/idle-task/commit/01e9b79ba6851f91a8097df2368ccf18a880b84b))

# [2.9.0](https://github.com/hiroki0525/idle-task/compare/v2.8.0...v2.9.0) (2022-11-27)


### Features

* add support for server ([8ceb3ea](https://github.com/hiroki0525/idle-task/commit/8ceb3ea101a9ed8e3995d91ebf3e8e96f0da7bf3))

# [2.8.0](https://github.com/hiroki0525/idle-task/compare/v2.7.3...v2.8.0) (2022-11-27)


### Bug Fixes

* `debug` is `false` as default ([a852bb6](https://github.com/hiroki0525/idle-task/commit/a852bb6bdd92696203e928b5956af4cf80c9960c))


### Features

* measure execution time of tasks more correctly ([dcc93c4](https://github.com/hiroki0525/idle-task/commit/dcc93c4c56a561294a246092c821e657230d1002))

## [2.7.3](https://github.com/hiroki0525/idle-task/compare/v2.7.2...v2.7.3) (2022-11-26)


### Bug Fixes

* avoid to patch `requestIdleCallback` and `cancelIdleCallback` globally ([0826fce](https://github.com/hiroki0525/idle-task/commit/0826fce5127a7fbc94df498fc0a07c08cbde192c))

## [2.7.2](https://github.com/hiroki0525/idle-task/compare/v2.7.1...v2.7.2) (2022-11-24)


### Bug Fixes

* check for `cancelIdleCallback` being defined ([0a19c57](https://github.com/hiroki0525/idle-task/commit/0a19c5778a02bc9f5219c5a29e93a8b3c76f222b))

## [2.7.1](https://github.com/hiroki0525/idle-task/compare/v2.7.0...v2.7.1) (2022-11-24)


### Bug Fixes

* avoid to define properties on same function ([57e8b55](https://github.com/hiroki0525/idle-task/commit/57e8b55fc72b4c63f5794c3b271e5c60111f9f60))

# [2.7.0](https://github.com/hiroki0525/idle-task/compare/v2.6.0...v2.7.0) (2022-11-23)


### Features

* add `ConfigureOptions.cache` ([8fc577c](https://github.com/hiroki0525/idle-task/commit/8fc577c071803e902ebbff20763012f29dcca6d0)), closes [/github.com/hiroki0525/idle-task#cache-boolean-2](https://github.com//github.com/hiroki0525/idle-task/issues/cache-boolean-2)

# [2.6.0](https://github.com/hiroki0525/idle-task/compare/v2.5.2...v2.6.0) (2022-11-22)


### Features

* add `ConfigureOptions.timeout` ([8ab7b41](https://github.com/hiroki0525/idle-task/commit/8ab7b419a736c50056ff1c15a56c3fdad56d4e92)), closes [/github.com/hiroki0525/idle-task#timeout-number-1](https://github.com//github.com/hiroki0525/idle-task/issues/timeout-number-1)

## [2.5.2](https://github.com/hiroki0525/idle-task/compare/v2.5.1...v2.5.2) (2022-11-21)


### Bug Fixes

* cancel task during executing `waitForIdleTask` with `cancelAllIdleTasks` ([608cb02](https://github.com/hiroki0525/idle-task/commit/608cb02f0bd38d7c776981d230ce816768c54506))

## [2.5.1](https://github.com/hiroki0525/idle-task/compare/v2.5.0...v2.5.1) (2022-11-21)


### Bug Fixes

* cancel task during executing `waitForIdleTask` ([9002953](https://github.com/hiroki0525/idle-task/commit/90029537e7911a63e423259fd23fd41c17e206a5))

# [2.5.0](https://github.com/hiroki0525/idle-task/compare/v2.4.0...v2.5.0) (2022-11-20)


### Features

* add `getResultFromIdleTask` ([7c56627](https://github.com/hiroki0525/idle-task/commit/7c5662752b9cc9d9c2793b3be262245a87fa2bdb))

# [2.4.0](https://github.com/hiroki0525/idle-task/compare/v2.3.0...v2.4.0) (2022-11-17)


### Bug Fixes

* incorrect type of `setIdleTask` parameter ([b7d368c](https://github.com/hiroki0525/idle-task/commit/b7d368cec96165efa78c8dc04c0219b1fa9f4d3c))


### Features

* add `SetIdleTaskOptions.cache` ([b929c8a](https://github.com/hiroki0525/idle-task/commit/b929c8a6ac7017a70f5c5c4a30dea4c311e13fbf))

# [2.3.0](https://github.com/hiroki0525/idle-task/compare/v2.2.0...v2.3.0) (2022-11-16)


### Bug Fixes

* enable cache when not set cache option ([26b3e20](https://github.com/hiroki0525/idle-task/commit/26b3e20428a93885f8dfd4554f4a254045acd8f7))


### Features

* add `WaitForIdleTaskOptions.timeout` ([18d2ca4](https://github.com/hiroki0525/idle-task/commit/18d2ca48a3c0735333e8c4f57fe1d0d8f46c6d08))

# [2.2.0](https://github.com/hiroki0525/idle-task/compare/v2.1.0...v2.2.0) (2022-11-16)


### Features

* add `WaitForIdleTaskOptions.cache` ([1dbfae2](https://github.com/hiroki0525/idle-task/commit/1dbfae264ac38078a6dfb23e18b53ee298332afa))

# [2.1.0](https://github.com/hiroki0525/idle-task/compare/v2.0.0...v2.1.0) (2022-11-15)


### Bug Fixes

* changelog ([eb864ef](https://github.com/hiroki0525/idle-task/commit/eb864ef03b6807654152e41e23c98e4cd1492721))


### Features

* add `waitForIdleTask` ([8b497e8](https://github.com/hiroki0525/idle-task/commit/8b497e82d00a26de1cf64d72f72a489c123c95eb))

# [2.0.0](https://github.com/hiroki0525/idle-task/compare/v1.0.0...v2.0.0) (2022-11-13)

### Features

* add debug mode ([1c03cdf](https://github.com/hiroki0525/idle-task/commit/1c03cdfe1fbc76fabb67e6ecc3c75ccfdd39fdd3))


# 1.0.0 (2022-11-13)


* Initial commit ([40d8713](https://github.com/hiroki0525/idle-task/commit/40d8713080fdf746624ee46f8510f166c08562b0))


### BREAKING CHANGES

* first release (this message was added because of `semantic-release` version up rule ).
