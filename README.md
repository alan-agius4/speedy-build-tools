# @speedy/build-tools
[![CircleCI](https://circleci.com/gh/alan-agius4/speedy-build-tools.svg?style=shield)](https://circleci.com/gh/alan-agius4/speedy-build-tools)
[![npm version](https://img.shields.io/npm/v/@speedy/build-tools.svg)](https://www.npmjs.com/package/@speedy/build-tools)
[![Dependency Status](https://img.shields.io/david/alan-agius4/speedy-build-tools.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-build-tools)
[![devDependency Status](https://img.shields.io/david/dev/alan-agius4/speedy-build-tools.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-build-tools?type=dev)

Node CLI/API for build tools and utilities such as linting (html, sass, ts), clean, compile, etc...
in order to simplify building libraries and applications.

**Currently under development.**

## Getting Started

### Installation

```
npm install @speedy/build-tools --save-dev
```

## NPM Scripts

Instead of depending on external task runners, `speedy-build-tools` can be configured to run from npm scripts (`package.json`).

```json
"scripts": {
    "lint-sass": "speedy-build-tools lint-sass",
    "lint-ts": "speedy-build-tools lint-ts"
},
````

Run NPM script as following

```
npm run lint-sass
```

## CLI

CLI can also be used directly without being added to NPM scripts.

```
speedy-build-tools clean --paths **/.tmp

// or shorthand
speedy clean --paths **/.tmp
```

## Tasks
Available tasks within `speedy-build-tools` which can be used via CLI.


| Task              | Description                  |
|-------------------|------------------------------|
| `clean [paths..]` | Delete files and directories |
| `lint-html`       | Lint Html files              |
| `lint-sass`       | Lint Sass files              |
| `lint-ts`         | Lint TypeScript files        |
___

### Clean

```
speedy-build-tools clean --paths .tmp/**
speedy-build-tools clean .tmp/** .test/**
```

| Option          | Description                                   | Type  |
|-----------------|-----------------------------------------------|-------|
| `--paths`, `-p` | Paths to be deleted - Supports glob patterns  | Array |

___

### Lint Html

```
speedy-build-tools lint-html
```

| Option              | Description                                                           | Default Value           | Type    |
|---------------------|-----------------------------------------------------------------------|-------------------------|---------|
| `--config`, `-c`    | Lint rules file path                                                  | `.htmlhintrc`           | string  |
| `--files`, `-f`     | Files to be linted - Supports glob patterns                           | `src/**/*.*(html|htm)`  | Array   |
| `--continueOnError` | Determines whether to exit with a non-zero status code on lint errors | `false`                 | boolean |

#### Rules
By default, it will try to locate the `.htmlhintrc` file in the root of your project folder. 
If the file is not found it will fallback to an internal `.htmlhintrc`.
This file can also be used as a base for your rules.

___

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
By default, it will try to locate the `.stylelintrc` file in the root of your project folder. 
If the file is not found it will fallback to an internal `.stylelintrc`.
This file can also be used as a base for your rules.

___

### Lint TypeScript

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
By default, it will try to locate the `tslint.json` file in the root of your project folder. 
If the file is not found it will fallback to an internal `tslint.json`.
This file can also be used as a base for your rules.

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
- [HTMLHint](https://github.com/yaniswang/HTMLHint)