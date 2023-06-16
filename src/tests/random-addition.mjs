import { benchmark } from "../runner.mjs";

const rand = () => Math.floor(Math.random() * 100);
const run = function () {
  let sum = 0;
  sum = rand() + rand();
  return sum;
};

benchmark({
  name: "random addition",
  tasks: {
    one: () => {
      run();
    },
    ten: () => {
      for (let i = 0; i < 10; i++) {
        run();
      }
    },
    hundred: () => {
      for (let i = 0; i < 100; i++) {
        run();
      }
    },
  },
});
