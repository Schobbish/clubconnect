// this script updates npm packages by rerunning the `npm install` command.
// I trust this more than ncu idk
// (although it's probably similar to `ncu -ut minor`)

// no-undef can also be fixed by adding `node: true` to eslintc
// but I would prefer not to do that just to "fix" this file
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const fs = require("fs");
const child_process = require("child_process");
/* eslint-enable */

function joinKeys(object) {
  return Object.keys(object).join(" ");
}

const packagejson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const depCommand = `npm i ${joinKeys(packagejson.dependencies)}`;
const devDepCommand = `npm i -D ${joinKeys(packagejson.devDependencies)}`;

console.log(`\n> ${depCommand}\n`);
child_process.execSync(depCommand, { stdio: "inherit" });

console.log(`\n> ${devDepCommand}\n`);
child_process.execSync(devDepCommand, { stdio: "inherit" });
