import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";

const dayNumber = process.argv[2];
const srcPath = `${process.cwd()}/src/day-${dayNumber}`

if (existsSync(srcPath)) {
    console.log('Path exists')
    process.exit();
}

mkdirSync(srcPath)

const templateContent = readFileSync('./scripts/template.ts', 'utf-8');
const templateTest = readFileSync('./scripts/template-test.ts', 'utf-8').replace('%n', dayNumber)

writeFileSync(`${srcPath}/day-${dayNumber}.ts`, templateContent);
writeFileSync(`${srcPath}/day-${dayNumber}.test.ts`, templateTest);


