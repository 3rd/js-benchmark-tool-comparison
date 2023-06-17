import * as mitata from "mitata";
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

mitata.bench("noop", () => {});

mitata.group(() => {
  mitata.bench("direct call", function () {
    eventHandler("bar");
    eventHandler("baz");
    eventHandler("boom");
  });
  mitata.bench("zodbus publish", function () {
    zodbus.publish("foo", "bar");
    zodbus.publish("foo", "baz");
    zodbus.publish("foo", "boom");
  });
  mitata.bench("tseep emit", function () {
    tseep.emit("foo", "bar");
    tseep.emit("foo", "baz");
    tseep.emit("foo", "boom");
  });
  mitata.bench("mitt emit", function () {
    mitt.emit("foo", "bar");
    mitt.emit("foo", "baz");
    mitt.emit("foo", "boom");
  });
}, false);
await mitata.run();
