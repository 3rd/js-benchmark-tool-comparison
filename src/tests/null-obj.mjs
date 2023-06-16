/* eslint-disable no-proto */
/* eslint-disable sonarjs/prefer-object-literal */
import { benchmark } from "../runner.mjs";

const createObject = (template) => {
  const obj = { ...template };
  obj.__proto__ = null;
  return obj;
};

const obj = createObject({
  foo: "bar",
});

benchmark({
  name: "null-obj",
  tasks: {
    read: () => {
      return obj["foo"];
    },
    write: () => {
      obj["foo"] = "baz";
      return obj;
    },
  },
});
