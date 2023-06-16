import { benchmark } from "../runner.mjs";

benchmark({
  name: "loops",
  tasks: {
    "for 1..100": () => {
      let sum = 0;
      for (let i = 0; i < 100; i++) {
        sum++;
      }
      return sum;
    },
    "for 1..1_000": () => {
      let sum = 0;
      for (let i = 0; i < 1_000; i++) {
        sum++;
      }
      return sum;
    },
    "for 1..10_000": () => {
      let sum = 0;
      for (let i = 0; i < 10_000; i++) {
        sum++;
      }
      return sum;
    },
  },
});
