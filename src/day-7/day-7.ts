import { readFileSync } from "fs";

async function parseFileInput(): Promise<Array<[number, number[]]>> {
  const text = readFileSync('./input.txt', 'utf8')
  const lines = text.trim().split("\n");
  return lines.map((line) => {
    const [value, numbers] = line.split(":");
    return [Number(value), numbers.trim().split(" ").map(Number)];
  });
}

async function part1() {
  const equations = await parseFileInput();
  let res = 0;

  for (const [value, numbers] of equations) {
    if (isValidEquation(value, numbers, [add, multiply])) {
      res += value;
    }
  }
  console.log("Part 1:", res);
}

async function part2() {
  const equations = await parseFileInput();
  let res = 0;

  for (const [value, numbers] of equations) {
    if (isValidEquation(value, numbers, [add, multiply, concat])) {
      res += value;
    }
  }
  console.log("Part 2:", res);
}

/*
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
*/

function isValidEquation(value: number, numbers: number[], operators: ((a: number, b: number) => number)[]) {
  let results: number[] = [];

  for (let i = 1; i < numbers.length; i++) {
    const newResults: number[] = [];

    if (i === 1) {
      for (const operator of operators) {
        newResults.push(operator(numbers[i - 1], numbers[i]))
      }
    } else {
      for (let j = 0; j < results.length; j++) {
        for (const operator of operators) {
          newResults.push(operator(results[j], numbers[i]))
        }
      }
    }
    results = [...newResults]
  }
  return results.some(result => result === value);
}

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function concat(a: number, b: number) {
  return Number(a.toString() + b.toString());
}

part1();
part2();


