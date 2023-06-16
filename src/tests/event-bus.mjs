import { z } from "zod";
import { create } from "zodbus";
import _mitt from "mitt";
import { EventEmitter } from "tseep";
import { benchmark } from "../runner.mjs";

const zodbus = create({ schema: { foo: z.string() }, validate: false });
zodbus.subscribe("foo", () => {});

const mitt = _mitt();
mitt.on("foo", () => {});

const tseep = new EventEmitter();
tseep.on("foo", () => {});

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
