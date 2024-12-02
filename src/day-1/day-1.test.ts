import { part1, part2 } from "./day-1";

test('example 1', () => {
    expect(part1([3,4,2,1,3,3], [4,3,5,3,9,3])).toBe(11);
})

test('example 2', () => {
    expect(part2([3,4,2,1,3,3], [4,3,5,3,9,3])).toBe(31);
})
