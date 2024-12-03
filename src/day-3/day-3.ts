import { readFileSync } from "fs";

const inp = readFileSync("./input2.txt", "utf-8");

const re = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g;

const matches = Array.from(inp.matchAll(re));

const n = matches.length;
let res = 0;
let skip = false;

for (let i = 0; i < n; i++) {
  if (matches[i][0] === "don't()") {
    skip = true;
    continue;
  }

  if (matches[i][0] === "do()") {
    skip = false;
    continue;
  }

  if (!skip) {
    res += parseInt(matches[i][1]) * parseInt(matches[i][2]);
  }
}

console.log(res);
