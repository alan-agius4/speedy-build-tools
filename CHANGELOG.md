<a name="0.1.1"></a>
## [0.1.1](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.0...v0.1.1) (2017-03-22)


### Bug Fixes

* **logger:** debug should not log when argv is false ([3a39cb8](https://github.com/alan-agius4/speedy-build-tools/commit/3a39cb8))
* **worker:** error for exporting `worker.process` ([5376926](https://github.com/alan-agius4/speedy-build-tools/commit/5376926))


### Features

* **tslint:** exported `LintTsResult` ([078aa81](https://github.com/alan-agius4/speedy-build-tools/commit/078aa81))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.3...v0.1.0) (2017-03-21)


### Bug Fixes

* **args:** handle arguments with `=` as they were not being parsed properly ([d2b9e56](https://github.com/alan-agius4/speedy-build-tools/commit/d2b9e56))
* **lint ts:** fixed result from being emitted multiple times ([981589b](https://github.com/alan-agius4/speedy-build-tools/commit/981589b))


### Features

* **cli:** cli shorthand command ([63c3744](https://github.com/alan-agius4/speedy-build-tools/commit/63c3744))


### BREAKING CHANGES

* **cli:** replace `sbt` with `speedy` as a shorthand version



<a name="0.0.3"></a>
## [0.0.3](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.2...v0.0.3) (2017-03-19)


### Bug Fixes

* **args:** `process.argv` was being ignored when `process.env.npm_config_argv` had values ([9941b53](https://github.com/alan-agius4/speedy-build-tools/commit/9941b53))


### Features

* **cli:** add `sbt` as shorthand version for `speedy-build-tools` ([d768925](https://github.com/alan-agius4/speedy-build-tools/commit/d768925))
* **lint:** remove `Codelyzer` from lint stack. ([147d76d](https://github.com/alan-agius4/speedy-build-tools/commit/147d76d))
* **lint html:** initial implementation ([fc4dbca](https://github.com/alan-agius4/speedy-build-tools/commit/fc4dbca))
* **utils:** add string `toPrimitive` method ([27c99ab](https://github.com/alan-agius4/speedy-build-tools/commit/27c99ab))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/alan-agius4/speedy-build-tools/compare/v0.0.1...v0.0.2) (2017-03-13)


### Features

* **clean:** Initial implementation of clean task ([b3a8203](https://github.com/alan-agius4/speedy-build-tools/commit/b3a8203))
* **utils:** implement `deleteAsync` ([5e093f1](https://github.com/alan-agius4/speedy-build-tools/commit/5e093f1))

### BREAKING CHANGES
* **utils:** rename `globArray` to `glob`


<a name="0.0.1"></a>
## 0.0.1 (2017-03-12)


### Features

* **findRoot:** make filePath optional ([0ea08ed](https://github.com/alan-agius4/speedy-build-tools/commit/0ea08ed))
* **lint ts:** Update `tslint` to `4.4.2` ([cf5b87f](https://github.com/alan-agius4/speedy-build-tools/commit/cf5b87f))
* **logger:** Improve error message display ([80ddb66](https://github.com/alan-agius4/speedy-build-tools/commit/80ddb66))
* **tests:** implement test setup ([8fe5c84](https://github.com/alan-agius4/speedy-build-tools/commit/8fe5c84))
* **utils:** add `findRoot` function ([#15](https://github.com/alan-agius4/speedy-build-tools/issues/15)) ([1b8942e](https://github.com/alan-agius4/speedy-build-tools/commit/1b8942e))



