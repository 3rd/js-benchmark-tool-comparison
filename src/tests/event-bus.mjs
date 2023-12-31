import { z } from "zod";
import { create } from "zodbus";
import _mitt from "mitt";
import { EventEmitter } from "tseep";
import { benchmark } from "../runner.mjs";

// eslint-disable-next-line no-unused-vars
function handler(_a, _b) {
  if (arguments.length > 100) console.log("check");
}

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", handler);

const mitt = _mitt();
mitt.on("foo", handler);

const tseep = new EventEmitter();
tseep.on("foo", handler);

benchmark({
  name: "event emitters",
  tasks: {
    zodbus: () => {
      zodbus.publish("foo", "bar");
      zodbus.publish("foo", "baz");
      zodbus.publish("foo", "boom");
    },
    mitt: () => {
      mitt.emit("foo", "bar");
      mitt.emit("foo", "baz");
      mitt.emit("foo", "boom");
    },
    tseep: () => {
      tseep.emit("foo", "bar");
      tseep.emit("foo", "baz");
      tseep.emit("foo", "boom");
    },
  },
});
