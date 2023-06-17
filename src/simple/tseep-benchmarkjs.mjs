import benchmark from "benchmark";
import { EventEmitter } from "tseep";

function eventHandler(a, b, c, d) {
  if (arguments.length > 100) console.log("check");
}

const tseep = new EventEmitter();
tseep.on("foo", eventHandler);

new benchmark.Suite()
  .add("tseep", function () {
    tseep.emit("foo", "bar");
    tseep.emit("foo", "baz");
    tseep.emit("foo", "boom");
  })
  .add("direct call", function () {
    eventHandler("bar");
    eventHandler("baz");
    eventHandler("boom");
  })
  .on("cycle", function cycle(e) {
    console.log(e.target.toString());
  })
  .on("complete", function completed() {
    console.log("Fastest is %s", this.filter("fastest").map("name"));
  })
  .run({ async: true });
