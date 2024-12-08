import { readFileSync } from "fs";

const lines = readFileSync('./input.txt', 'utf8').trim().split('\n');
const input: [number, number[]][] = []

lines.map(l => {
    const [ans, nums] = l.split(':');
    input.push([parseInt(ans), nums.trim().split(' ').map(n => parseInt(n.trim()))])
})

function isValid(lhs: number, nums: number[], operators: ((a: number, b: number) => number)[]): number {
    let results: number[] = []

    for (let i = 1; i < nums.length; i++) {
        const tempResults: number[] = [];

        if (i === 1) {
            for (const operator of operators) {
                tempResults.push(operator(nums[i-1], nums[i]))
            }
        } else {
            for (let j = 0; j < results.length; j++) {
                for (const operator of operators) {
                    tempResults.push(operator(results[j], nums[i]))
                }
            }
        }
        results = [...tempResults]
    }

    if (results.includes(lhs)) {
        return lhs;
    }

    return 0
}

function part1() {
    let res = 0;
    const operators = [add, mul]

    for (const [lhs, nums] of input) {
        res += isValid(lhs, nums, operators)
    }

    console.log(res)
}

function part2() {
    let res = 0;
    const operators = [add, mul, concat]

    for (const [lhs, nums] of input) {
        res += isValid(lhs, nums, operators)
    }

    console.log(res)
}

function add(a: number, b: number) {
    return a + b;
}

function mul(a: number, b: number) {
    return a * b;
}

function concat(a: number, b: number) {
    return parseInt(`${a}${b}`)
}

part1()
part2()
