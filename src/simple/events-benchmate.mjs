import { Bench } from "benchmate";
import { z } from "zod";
import { create } from "zodbus";
import { EventEmitter } from "tseep";
import _mitt from "mitt";

const counts = {
  direct: 0,
  tseep: 0,
  zodbus: 0,
  mitt: 0,
};

const handleDirect = function () {
  counts.direct++;
};
const handleTseep = function () {
  counts.tseep++;
};
const handleZodbus = function () {
  counts.zodbus++;
};
const handleMitt = function () {
  counts.mitt++;
};

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", handleZodbus);

const tseep = new EventEmitter();
tseep.on("foo", handleTseep);

const mitt = _mitt();
mitt.on("foo", handleMitt);

const bench = new Bench({
  // iterations: 10_000_000,
  // time: 2000,
});

bench.add("direct call", () => {
  handleDirect();
  handleDirect();
  handleDirect();
});

bench.add("tseep", function () {
  tseep.emit("foo", "bar");
  tseep.emit("foo", "baz");
  tseep.emit("foo", "boom");
});

bench.add("zodbus", function () {
  zodbus.publish("foo", "bar");
  zodbus.publish("foo", "baz");
  zodbus.publish("foo", "boom");
});

bench.add("mitt", function () {
  mitt.emit("foo", "bar");
  mitt.emit("foo", "baz");
  mitt.emit("foo", "boom");
});

await bench.run();
console.log(counts);
