import Benchmark from "benchmark";
import * as tinybench from "tinybench";
import * as mitata from "mitata";
import { banner, logRun } from "./utils.mjs";

const runners = {
  "benchmark.js": (tasks) => {
    return new Promise((resolve) => {
      const suite = new Benchmark.Suite();
      for (const task of tasks) {
        suite.add(task.name, task.run);
      }
      suite.on("cycle", (event) => {
        console.log(String(event.target));
      });
      suite.on("complete", function () {
        console.log("Fastest is " + this.filter("fastest").map("name"));
        resolve();
      });
      suite.run({ async: true });
    });
  },
  tinybench: async (tasks) => {
    const bench = new tinybench.Bench();
    for (const task of tasks) {
      bench.add(task.name, task.run);
    }
    await bench.warmup();
    await bench.run();
    console.table(bench.table());
  },
  mitata: async (tasks) => {
    mitata.group(() => {
      for (const task of tasks) {
        mitata.bench(task.name, task.run);
      }
    }, false);
    await mitata.run();
  },
};

export const benchmark = async (suite) => {
  banner(suite.name);
  for (const [engine, run] of Object.entries(runners)) {
    const tasks = Object.entries(suite.tasks).map(([name, func]) => ({
      name,
      run: func,
      // run: catchable(func),
    }));
    logRun(engine, suite.name);
    // eslint-disable-next-line no-await-in-loop
    await run(tasks);
  }
};
