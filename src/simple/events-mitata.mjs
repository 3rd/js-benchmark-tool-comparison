import * as mitata from "mitata";
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

const handleDirect = function (data) {
  if (data === "x") return false;
  counts.direct++;
};
const handleTseep = function (data) {
  if (data === "x") return false;
  counts.tseep++;
};
const handleZodbus = function (data) {
  if (data === "x") return false;
  counts.zodbus++;
};
const handleMitt = function (data) {
  if (data === "x") return false;
  counts.mitt++;
};

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", handleZodbus);

const tseep = new EventEmitter();
tseep.on("foo", handleTseep);

const mitt = _mitt();
mitt.on("foo", handleMitt);

// eslint-disable-next-line no-empty-function
mitata.bench("noop", () => {});

mitata.group(() => {
  mitata.bench("direct call", function () {
    handleDirect("bar");
    handleDirect("baz");
    handleDirect("boom");
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
