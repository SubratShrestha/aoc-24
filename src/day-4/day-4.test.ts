import { readFileSync } from "fs";
import { part1, part2 } from "./day-4";

test('example 1', () => {
    const answer = 18;
    const input = readFileSync('./input-test.txt', 'utf8');
    expect(part1(input)).toBe(answer);
})
