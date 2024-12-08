import { readFileSync } from "fs";

export function part1() {
    const input = readFileSync('./input.txt', 'utf8').split('\n');
    const n = input[0].length
    const m = input.length - 1;
    let res = 0;
    const re = /XMAS|SAMX/;

    // left, right
    for (const row of input.slice(0, -1)) {
        res += matchOverlap(row, re).length
    }

    const a = input.map((row) => row.split('')).slice(0, -1)
    const cols = [];
    for (let j = 0; j < m; j++) {
        let s = ""
        for (let i = 0; i < n; i++) {
            s = s.concat(a[i][j])
        }
        cols.push(s)
    }

    for (const col of cols) {
        res += matchOverlap(col, re).length
    }


    const diagonals = getAllDiagonal(a)
    for (const d of diagonals[0]) {
        res += matchOverlap(d, re).length
    }

    for (const d of diagonals[1]) {
        res += matchOverlap(d, re).length
    }

    console.log(res)
}

function matchOverlap(input: string, re: any) {
    var r = [], m;
    // Prevent infinite loops
    if (!re.global) re = new RegExp(
        re.source, (re+'').split('/').pop() + 'g'
    );
    while (m = re.exec(input)) {
        re.lastIndex -= m[0].length - 1;
        r.push(m[0]);
    }
    return r;
}

function getAllDiagonal(array: string[][]) {
    function row(offset: number) {
        var i = array.length, a = '';
        while (i--) {
            a += array[i][j + (offset ? offset - i : i)] || '';
        }
        return a;
    }

    const result: [string[], string[]] = [[], []]
    let j = 0;
    for (j = 1 - array.length; j < array[0].length; j++) {
        result[0].push(row(0));
        result[1].push(row(array.length - 1));
    }
    return result;
}

export function part2() {
    const input = readFileSync('./input.txt', 'utf8').split('\n').map((row) => row.split('')).slice(0, -1)
    const n = input[0].length;
    const m = input.length;
    let res = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (input[i][j] === 'A' && i > 0 && j > 0 && i < n -1 && j < m-1) {
                const topLeft = input[i-1][j-1];
                const topRight = input[i-1][j+1];
                const bottomLeft = input[i+1][j-1];
                const bottomRight = input[i+1][j+1];
                const d1 = `${topLeft}A${bottomRight}`
                const d2 = `${topRight}A${bottomLeft}`

                if ([...d1].sort().join('') === "AMS" && [...d2].sort().join('') === "AMS") {
                    res++;
                }
            }
        }
    }

    console.log(res)

}

part2();

