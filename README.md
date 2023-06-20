# Benchmarking experiments

This is an exploration of how benchmarking works in the JS world.

My plan is to try out and compare all the available benchmarking tools,
mostly to make sure [ZodBus](https://github.com/3rd/zodbus) and other event bus / emitter libraries
are benchmarked properly.

## What are we testing?

- [Benchmark.js](https://github.com/bestiejs/benchmark.js)
- [mitata](https://github.com/evanwashere/mitata)
- [tinybench](https://github.com/tinylibs/tinybench)
- [benchmate](https://github.com/3rd/benchmate)

The engines are configured in [./src/runner.mjs](./src/runner.mjs)
The test files are located in [./src/tests/*](./src/tests)

### Trying it out on your own machine (Linux)

```sh
git clone https://github.com/3rd/js-benchmark-tool-comparison
cd js-benchmark-tool-comparison
pnpm install
npm run benchmark
```

### Latest results

I'll be updating the results of the benchmarks here: [./latest.txt](latest.txt)

Environment:
- OS: Linux
- Node: v18.16.0
- CPU: AMD Ryzen 9 3950X (32) @ 3.500GHz

