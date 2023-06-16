# Benchmarking experiments

This is an exploration of how benchmarking works in the JS world.

My plan is to try out and compare all the available benchmarking tools,
mostly to make sure [ZodBus](https://github.com/3rd/zodbus) and other event bus / emitter libraries
are benchmarked properly.

### Trying it out on your own machine (Linux)

Notes:
- the test files are located in [./src/tests/*](./src/tests)
- the engines are configured in [./src/runner.mjs](./src/runner.mjs)

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

