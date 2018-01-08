<a name="0.6.0"></a>
# [0.6.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.5.0...v0.6.0) (2018-01-08)


### Code Refactoring

* call lint once ([a2886d2](https://github.com/alan-agius4/speedy-build-tools/commit/a2886d2))


### Features

* update several dependencies ([0a8a3ed](https://github.com/alan-agius4/speedy-build-tools/commit/0a8a3ed))
* **config:** add `no-duplicate-at-import-rules` in scss lint rules ([065539c](https://github.com/alan-agius4/speedy-build-tools/commit/065539c))
* **lint:** `SASS` auto fixes are now provided via  `stylelint` ([8fb34c8](https://github.com/alan-agius4/speedy-build-tools/commit/8fb34c8))


### BREAKING CHANGES

* `lintSass` now returns `Promise<LinterResult>` instead of `Promise<LinterResult[]>`



<a name="0.5.0"></a>
# [0.5.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.4.2...v0.5.0) (2017-10-23)


### Features

* **args:** change `args.set` generic type to extends from `Arguments` ([2904fa2](https://github.com/alan-agius4/speedy-build-tools/commit/2904fa2))
* **packages:** update `chalk`to latest version ([b1801f8](https://github.com/alan-agius4/speedy-build-tools/commit/b1801f8))


### BREAKING CHANGES

- `args.set` generic type must now extends `Arguments`
- `Arguments` interface now extends `yargs.Arguments`



<a name="0.4.2"></a>
## [0.4.2](https://github.com/alan-agius4/speedy-build-tools/compare/v0.4.1...v0.4.2) (2017-07-15)


### Features

* **config:** add `interface-name` rule with `never-prefix` in `ts lint config` ([86857fa](https://github.com/alan-agius4/speedy-build-tools/commit/86857fa))
* **config:** replace `selector-no-id` with `selector-max-id` as it has been deprecated ([d4d1d25](https://github.com/alan-agius4/speedy-build-tools/commit/d4d1d25))
* **config:** sass lint set `selector-pseudo-element-colon-notation` to `double` ([550fd55](https://github.com/alan-agius4/speedy-build-tools/commit/550fd55))
* **packages:** bump `stylefmt` to `6.x.x` and `chalk` to `2.x.x` ([f96f874](https://github.com/alan-agius4/speedy-build-tools/commit/f96f874))


### Performance Improvements

* **all:** import `require-cache` file from the specific file rather than from the index ([0d1f332](https://github.com/alan-agius4/speedy-build-tools/commit/0d1f332))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/alan-agius4/speedy-build-tools/compare/v0.4.0...v0.4.1) (2017-05-18)


### Bug Fixes

* **config:** set default path relative to this file location ([3768af7](https://github.com/alan-agius4/speedy-build-tools/commit/3768af7))
* **require cache:** update relative path ([e6601d0](https://github.com/alan-agius4/speedy-build-tools/commit/e6601d0))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.3.0...v0.4.0) (2017-05-18)


### Features

* **config:** add `ban-types` to tslint rules ([a6ed5ff](https://github.com/alan-agius4/speedy-build-tools/commit/a6ed5ff))
* **lint html:** format lint errors better ([00693b7](https://github.com/alan-agius4/speedy-build-tools/commit/00693b7))
* **packages:** bump `postcss` to `6.x.x` and `postcss-scss` to `1.x.x` ([9e870e7](https://github.com/alan-agius4/speedy-build-tools/commit/9e870e7))
* **packages:** bump `yargs` to `8.x.x` ([c21ed4b](https://github.com/alan-agius4/speedy-build-tools/commit/c21ed4b))


### Performance Improvements

* **all:** implement caching of resolved `require` paths ([47bcdaf](https://github.com/alan-agius4/speedy-build-tools/commit/47bcdaf))
* **tasks:** lazy register tasks to speed up `cli` boot time ([b56ec54](https://github.com/alan-agius4/speedy-build-tools/commit/b56ec54))


### BREAKING CHANGES

* **packages:** Node 4+ is now required
* **utils:** Most of the utils have been removed in favor of `@speedy/node-core`



<a name="0.3.0"></a>
# [0.3.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.2.0...v0.3.0) (2017-04-10)


### Bug Fixes

* **lint sass:** fix error on auto fix when SCSS syntax is present ([e79cd17](https://github.com/alan-agius4/speedy-build-tools/commit/e79cd17))


### Features

* **lint ts:** change `fixesCount` to always return a value ([cac10f9](https://github.com/alan-agius4/speedy-build-tools/commit/cac10f9))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.4...v0.2.0) (2017-04-01)


### Features

* **ts lint:** update ts lint rules ([7fb49c6](https://github.com/alan-agius4/speedy-build-tools/commit/7fb49c6))
* **ts lint:** updated to `5.x` ([7f68ccb](https://github.com/alan-agius4/speedy-build-tools/commit/7f68ccb))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.3...v0.1.4) (2017-03-26)


### Bug Fixes

* **config:** fixed an issue which was preventing base configs to be shared ([cd05b20](https://github.com/alan-agius4/speedy-build-tools/commit/cd05b20))
* **lint:** process was exiting before finish log ([c0c6f96](https://github.com/alan-agius4/speedy-build-tools/commit/c0c6f96))
* **typings:** missing types in package ([69181b1](https://github.com/alan-agius4/speedy-build-tools/commit/69181b1))


### Features

* **typescript:** update `TypeScript` to `2.2.1` ([84b71db](https://github.com/alan-agius4/speedy-build-tools/commit/84b71db))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.2...v0.1.3) (2017-03-23)


### Bug Fixes

* **config:** fixed an issue which was preventing base configs to be shared ([fcca444](https://github.com/alan-agius4/speedy-build-tools/commit/fcca444))
* **tslint:** fixed tslint config `rulesDirectory` was invalid ([ab687fb](https://github.com/alan-agius4/speedy-build-tools/commit/ab687fb))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/alan-agius4/speedy-build-tools/compare/v0.1.1...v0.1.2) (2017-03-22)


### Features

* **lint config:** move them into a seperate folder ([9bd5299](https://github.com/alan-agius4/speedy-build-tools/commit/9bd5299))



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



