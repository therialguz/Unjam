# Unjam

_Unblock your JavaScript with non-blocking array methods!_

[![npm version](https://img.shields.io/npm/v/unjam.svg)](https://www.npmjs.com/package/unjam)
[![Static Badge](https://img.shields.io/badge/Docs-blue)](https://therialguz.github.io/Unjam/)
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

## 📚 Documentation

For a full API reference and detailed examples, check out the [Documentation](https://therialguz.github.io/Unjam/).

## 🛠️ Usage

Import the methods you need from Unjam and use them just like the standard array methods, but with the added benefit of non-blocking execution. Thanks to tree-shaking support, importing directly from the module ensures that only the code you use gets included in your bundle.

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

Check out how Unjam’s cooperative multitasking keeps your app smooth and responsive:

### Non-Cooperative Execution

![Non-Cooperative Execution](path/to/non_cooperative_graph.png)

_In non-cooperative execution, long-running tasks block the main thread, leading to unresponsive UIs and poor user experiences._

### Cooperative Execution with Unjam

![Cooperative Execution with Unjam](path/to/cooperative_graph.png)

_With Unjam's cooperative execution, tasks are broken into manageable chunks, allowing the main thread to remain responsive and the UI to stay smooth._

These graphs illustrate how Unjam prevents the main thread from being blocked during intensive array operations, ensuring your application stays responsive.

## 🔄 Advanced Usage and Patterns

### Combining Methods

Chain methods like `map` and `filter` with Unjam for more complex data processing.

```javascript
import { map, filter } from "unjam";

const largeArray = Array.from({ length: 10_000_000 }, (_, i) => i);

const squared = map(largeArray, (num) => {
  return num * num;
});
const filtered = await filter(squared, (num) => {
  return num % 2 === 0;
});

// or

const filtered2 = await filter(map(largeArray, (num) => {
  return num * num
}), (num) => num % 2 === 0)

console.log(filtered);
console.log(filtered2
```

### Creating Custom Algorithms

Unjam includes a `cooperate` function to build custom, cooperative algorithms. Let’s create a function that squares and filters an array in a cooperative-friendly way.

```javascript
import { map, filter, cooperate } from "unjam";

const largeArray = Array.from({ length: 100000 }, (_, i) => i);

const squareAndFilter = async (array) =>
  await cooperate(async () => {
    const squared = await map(array, (num) => num * num);
    const filtered = filter(squared, (num) => num % 2 === 0);
    return filtered;
  });

console.log(await squareAndFilter(largeArray));
```

You’re not limited to using only cooperative methods inside `cooperate`; create custom logic to control when to yield back to the event loop:

```javascript
import { cooperate } from "unjam";

// Yield back control after 3 cycles
await cooperate(async (handoff) => {
  await handoff();
  await handoff();
  await handoff();
});
```

Behind the scenes, all Unjam methods are powered by the `cooperate` function, keeping execution cooperative and non-blocking.

## 💬 FAQ

**Q: How does Unjam differ from using Web Workers?**  
_A: Unjam operates on the main thread but breaks tasks into non-blocking chunks, unlike the multi-threaded approach of Web Workers._

**Q: Is Unjam suitable for real-time applications?**  
_A: Yes, Unjam is designed to keep the main thread responsive, making it ideal for real-time applications handling large datasets._

## ⚠️ Limitations & Considerations

Unjam is optimized for large datasets, but in cases where processing time per item is minimal, native methods might be faster. Ensure that breaking large tasks into chunks aligns with your application’s performance goals.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request to help improve Unjam.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
