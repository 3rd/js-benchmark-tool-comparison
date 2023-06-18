import * as tinybench from "tinybench";
import { z } from "zod";
import { create } from "zodbus";
import { EventEmitter } from "tseep";
import _mitt from "mitt";

function eventHandler(a, b, c, d) {
  if (arguments.length > 100) console.log("check");
}

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", eventHandler);

const tseep = new EventEmitter();
tseep.on("foo", eventHandler);

const mitt = _mitt();
mitt.on("foo", eventHandler);

const bench = new tinybench.Bench();

bench.add("direct call", function () {
  eventHandler("bar");
  eventHandler("baz");
  eventHandler("boom");
});

bench.add("zodbus", function () {
  zodbus.publish("foo", "bar");
  zodbus.publish("foo", "baz");
  zodbus.publish("foo", "boom");
});

bench.add("tseep", function () {
  tseep.emit("foo", "bar");
  tseep.emit("foo", "baz");
  tseep.emit("foo", "boom");
});

bench.add("mitt", function () {
  mitt.emit("foo", "bar");
  mitt.emit("foo", "baz");
  mitt.emit("foo", "boom");
});

await bench.run();
console.table(bench.table());
