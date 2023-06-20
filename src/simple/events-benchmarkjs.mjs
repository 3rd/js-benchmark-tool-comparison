import benchmark from "benchmark";
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

const handlers = {
  direct: function () {
    counts.direct++;
  },
  tseep: function () {
    counts.tseep++;
  },
  zodbus: function () {
    counts.zodbus++;
  },
  mitt: function () {
    counts.mitt++;
  },
};

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", handlers.zodbus);

const tseep = new EventEmitter();
tseep.on("foo", handlers.tseep);

const mitt = _mitt();
mitt.on("foo", handlers.mitt);

new benchmark.Suite()
  .add("direct call", function () {
    handlers.direct("bar");
    handlers.direct("baz");
    handlers.direct("boom");
  })
  .add("tseep", function () {
    tseep.emit("foo", "bar");
    tseep.emit("foo", "baz");
    tseep.emit("foo", "boom");
  })
  .add("zodbus", function () {
    zodbus.publish("foo", "bar");
    zodbus.publish("foo", "baz");
    zodbus.publish("foo", "boom");
  })
  .add("mitt", function () {
    mitt.emit("foo", "bar");
    mitt.emit("foo", "baz");
    mitt.emit("foo", "boom");
  })
  .on("cycle", function cycle(e) {
    console.log(e.target.toString());
  })
  .on("complete", function completed() {
    console.log("Fastest is %s", this.filter("fastest").map("name"));
  })
  .run({ async: true });
