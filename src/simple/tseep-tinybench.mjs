import * as tinybench from "tinybench";
import { EventEmitter } from "tseep";

function eventHandler(a, b, c, d) {
  if (arguments.length > 100) console.log("check");
}

const tseep = new EventEmitter();
tseep.on("foo", eventHandler);

const bench = new tinybench.Bench();

bench.add("tseep", function () {
  tseep.emit("foo", "bar");
  tseep.emit("foo", "baz");
  tseep.emit("foo", "boom");
});

bench.add("direct call", function () {
  eventHandler("bar");
  eventHandler("baz");
  eventHandler("boom");
});

await bench.run();
console.table(bench.table());
