# Unjam

_Unblock your JavaScript with non-blocking array methods!_

[![npm version](https://img.shields.io/npm/v/unjam.svg)](https://www.npmjs.com/package/unjam)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Overview

Unjam is a JavaScript/TypeScript library that provides non-blocking, cooperative multitasking versions of common array methods like `forEach`, `map`, `filter`, and more. By using Unjam, you can process large datasets without freezing the main thread, ensuring smooth and responsive user experiences.

## ✨ Features

- **Non-blocking operations**: Keep your UI responsive even when working with large datasets.
- **Zero dependencies**: Lightweight and efficient, with no extra overhead.
- **Familiar API**: Uses the same method signatures as standard array methods.
- **Tree-shaking support**: Import only what you need for optimal bundle size.
- **TypeScript support**: Fully typed for a better development experience.
- **Lightweight**: Minimal overhead with maximum benefits.

## 📦 Installation

```bash
# Using npm
npm install unjam

# Using yarn
yarn add unjam

# Using pnpm
pnpm add unjam
```

## 🛠️ Usage

Import the methods you need from Unjam and use them just like the standard array methods, but with the added benefit of not blocking the main thread. Thanks to tree-shaking support, importing directly from the module ensures that only the code you use gets included in your bundle.

```javascript
import { forEach, map, filter } from 'unjam';

const largeArray = [...]; // Your large dataset

// Non-blocking forEach
await forEach(largeArray, (item) => {
  // Your logic here
});

// Non-blocking map
const result = await map(largeArray, (item) => {
  // Your transformation here
});

// Non-blocking filter
const filtered = await filter(largeArray, (item) => {
  // Your condition here
});
```

## 🌳 Tree-Shaking Support

Unjam is designed with tree-shaking in mind. By importing methods directly from the module, modern bundlers like Webpack and Rollup can eliminate unused code from your final bundle, optimizing load times and performance.

```javascript
import { map } from "unjam/map"; // Only imports the 'map' function
```

## 📊 Performance Comparison

Visualizing the benefits of cooperative multitasking with Unjam:

### Non-Cooperative Execution

![Non-Cooperative Execution](path/to/non_cooperative_graph.png)

_In non-cooperative execution, long-running tasks block the main thread, leading to unresponsive UIs and poor user experiences._

### Cooperative Execution with Unjam

![Cooperative Execution with Unjam](path/to/cooperative_graph.png)

_With Unjam's cooperative execution, tasks are broken into manageable chunks, allowing the main thread to remain responsive and the UI to stay smooth._

These graphs illustrate how Unjam improves performance by preventing the main thread from being blocked during intensive array operations. By processing data in smaller chunks and yielding control back to the event loop, Unjam ensures that your application remains responsive.

## 📝 Example

```javascript
import { map } from "unjam";

const largeArray = Array.from({ length: 100000 }, (_, i) => i);

const squared = await map(largeArray, (num) => {
  return num * num;
});

console.log(squared);
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
