# @speedy/build-tools
[![CircleCI](https://circleci.com/gh/alan-agius4/speedy-build-tools.svg?style=shield)](https://circleci.com/gh/alan-agius4/speedy-build-tools)
[![npm version](https://img.shields.io/npm/v/@speedy/build-tools.svg)](https://www.npmjs.com/package/@speedy/build-tools)
[![Dependency Status](https://img.shields.io/david/alan-agius4/speedy-build-tools.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-build-tools)
[![devDependency Status](https://img.shields.io/david/dev/alan-agius4/speedy-build-tools.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-build-tools?type=dev)

**Currently under development.**

## Getting Started

### Installation

```
npm install @speedy/build-tools --save-dev
```

## NPM Scripts

Instead of depending on external task runners, `speedy-build-tools` can be configured to being executed from npm scripts.

```json
"scripts": {
    "lint-sass": "speedy-build-tools lint-sass",
    "lint-ts": "speedy-build-tools lint-ts"
},
````

To run the build script found in the `package.json` scripts, execute:

```
npm run lint-sass
```

## CLI

You can also use the CLI tasks direcly without the need to added them as NPM scripts.

```
speedy-build-tools clean --paths **/.tmp
``` 

alternatively use the shorthand version:

```
sbt clean --paths **/.tmp
```

## Tasks
These are all the available tasks within `speedy-build-tools` and can be added to npm scripts.


| Task            | Description                  |
|-----------------|------------------------------|
| clean [paths..] | Delete files and directories |
| `lint-sass`     | Lint Sass files              |
| `lint-ts`       | Lint Typescript files        |
___

### Clean

```
speedy-build-tools clean --paths .tmp/**
speedy-build-tools clean .tmp/** .test/**
```

| Option          | Description                                   | Type  |
|-----------------|-----------------------------------------------|-------|
| `--paths`, `-p` | Paths to be deleted - Supports glob patterns  | Array |

### Lint Sass

```
speedy-build-tools lint-sass
```

| Option              | Description                                                           | Default Value           | Type    |
|---------------------|-----------------------------------------------------------------------|-------------------------|---------|
| `--config`, `-c`    | Lint rules file path                                                  | `.stylelintrc`          | string  |
| `--files`, `-f`     | Files to be linted - Supports glob patterns                           | `src/**/*.*(scss|sass)` | Array   |
| `--formatter`       | Formatter to use to format the linter results                         | `verbose`               | string  |
| `--fix`             | Determines whether to auto fix lint issues (which support fixing)     | `false`                 | boolean |
| `--continueOnError` | Determines whether to exit with a non-zero status code on lint errors | `false`                 | boolean |

#### Rules
By default, it will try to locate the `.stylelintrc` file in the root of your project folder. If the file is not found it will fallback to an internal `.stylelintrc`. This file can also be used as a base for your rules.

___

### Lint Typescript

```
speedy-build-tools lint-ts
```

| Option              | Description                                                           | Default Value | Type    |
|---------------------|-----------------------------------------------------------------------|---------------|---------|
| `--config`, `-c`    | Lint rules file path                                                  | `tslint.json` | string  |
| `--files`, `-f`     | Files to be linted - Supports glob patterns                           | `src/**/*.ts` | Array   |
| `--formatter`       | Formatter to use to format the linter results                         | `stylish`     | string  |
| `--fix`             | Determines whether to auto fix lint issues (which support fixing)     | `false`       | boolean |
| `--continueOnError` | Determines whether to exit with a non-zero status code on lint errors | `false`       | boolean |

#### Rules
By default, it will try to locate the `tslint.json` file in the root of your project folder. If the file is not found it will fallback to an internal `tslint.json`. This file can also be used as a base for your rules.

___

### Global Options
| Option            | Description            |
|-------------------|------------------------|
| `--debug`         | Show debug information |
| `--help`, `-h`    | Show help              |
| `--version`, `-v` | Show version number    |

Display general help

```
speedy-build-tools --help
```

Display help specific to a task:

```
speedy-build-tools lint-sass --help
```

To display help when running the task from a mapped npm script you should omit the `--`;

```
npm run lint-sass help
```

## Stack

- [Stylelint](https://github.com/stylelint/stylelint)
- [Stylelint SCSS](https://github.com/kristerkari/stylelint-scss)
- [Stylefmt](https://github.com/morishitter/stylefmt)
- [TSLint](http://palantir.github.io/tslint)