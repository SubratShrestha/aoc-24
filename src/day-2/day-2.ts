import { readFileSync } from "fs";

const input1 = readFileSync("./b-input.txt", "utf8")
  .split("\n")
  .map((list) => list.split(" ").map((e) => parseInt(e)));

const isValid = (list: number[]): boolean => {
  const n = list.length;
  let isInc = true;
  let isDec = true;
  let isValid = true;

  for (let i = 1; i < n; i++) {
    const diff = list[i] - list[i - 1];

    if (diff < 0) {
      isInc = false;
    }

    if (diff > 0) {
      isDec = false;
    }

    if (!(Math.abs(diff) <= 3 && Math.abs(diff) >= 1)) {
      isValid = false;
      break;
    }
  }

  return isValid && (isDec || isInc);
};

let res = 0;

for (const list of input1) {
  const n = list.length;
  let isAnyValid = false;

  const consider = (ind: number) => {
    const list2 = list.slice();
    list2.splice(ind, 1);

    if (isValid(list2)) {
      isAnyValid = true;
    }
  };

  consider(0);

  for (let i = 0; i < n - 1; i++) {
    const diff = list[i + 1] - list[i];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      consider(i);
      consider(i + 1);
      break;
    }

    if (i + 2 < n) {
      const diff2 = list[i + 2] - list[i + 1]; // -1

      if (diff > 0 !== diff2 > 0) {
        consider(i);
        consider(i + 1);
        consider(i + 2);
        break;
      }
    }
  }

  if (isAnyValid) {
    res += 1;
  }
}
console.log(res);
