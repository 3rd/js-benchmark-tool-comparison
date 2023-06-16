const reset = "\x1b[0m";
const magenta = "\x1b[35m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";

export const catchable = (func) => () => {
  try {
    func();
  } catch (error) {
    console.error(error);
  }
};

export const banner = (text, length = 40) => {
  const barLength = length - text.length - 2;
  const halfBarLength = Math.floor(barLength / 2);
  let output = `\n${red}${"=".repeat(length)}\n`;
  output += "=".repeat(halfBarLength);
  output += `${yellow} ${text} ${red}`;
  output += "=".repeat(barLength - halfBarLength);
  output += `\n${"=".repeat(length)}${reset}`;
  console.log(output);
};

export const logRun = (engine, suite) => {
  console.log(`\n${magenta}~> ${cyan}${engine}: ${yellow}${suite}${reset}`);
};
