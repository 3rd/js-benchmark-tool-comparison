import { benchmark } from "../runner.mjs";

benchmark({
  name: "RegExp#test vs String#indexOf",
  tasks: {
    "RegExp#test": () => {
      /o/.test("Hello World!");
    },
    "String#indexOf": () => {
      "Hello World!".indexOf("o") > -1;
    },
  },
});
