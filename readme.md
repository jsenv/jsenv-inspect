# inspect

Convert a value into a readable string.

[![github package](https://img.shields.io/github/package-json/v/jsenv/jsenv-inspect.svg?logo=github&label=package)](https://github.com/jsenv/jsenv-inspect/packages)
[![npm package](https://img.shields.io/npm/v/@jsenv/inspect.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/inspect)
[![github ci](https://github.com/jsenv/jsenv-inspect/workflows/ci/badge.svg)](https://github.com/jsenv/jsenv-inspect/actions?workflow=ci)
[![codecov coverage](https://codecov.io/gh/jsenv/jsenv-inspect/branch/master/graph/badge.svg)](https://codecov.io/gh/jsenv/jsenv-inspect)

# Table of contents

- [Presentation](#Presentation)
- [Installation](#Installation)
- [Documentation](#Documentation)

# Presentation

`@jsenv/inspect` turns a JavaScript value into a string meant to be read by a human.

```js
import { inspect } from "../index.js"

console.log(
  inspect({
    boolean: true,
    number: 10,
    string: "hello world",
  }),
)
```

![terminal screenshot](./docs/terminal-screenshot.png)

Inspect is alsmot equivalent to JSON.stringify

```js
const inspect = (value) => JSON.stringify(value, null, "  ")
```

The difference is that inspect handle values that JSON.stringify does not and focuses on readability.

```js
JSON.stringify(Infinity) // "null"
JSON.stringify(-0) // "0"

inspect(Infinity) // "Infinity"
inspect(-0) // "-0"
```

# Installation

```console
npm install @jsenv/inspect@1.3.1
```

# Documentation

Live browser example: https://jsenv.github.io/jsenv-inspect/#browser-example.

Live node example: https://jsenv.github.io/jsenv-inspect/#node-example
