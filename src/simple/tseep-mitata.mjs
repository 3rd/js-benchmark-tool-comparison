import * as mitata from "mitata";
import { EventEmitter } from "tseep";

function eventHandler(a, b, c, d) {
  if (arguments.length > 100) console.log("check");
}

const tseep = new EventEmitter();
tseep.on("foo", eventHandler);

mitata.bench("noop", () => {});

mitata.group(() => {
  mitata.bench("direct call", function () {
    eventHandler("bar");
    eventHandler("baz");
    eventHandler("boom");
  });
  mitata.bench("tseep emit", function () {
    tseep.emit("foo", "bar");
    tseep.emit("foo", "baz");
    tseep.emit("foo", "boom");
  });
}, false);
await mitata.run();
