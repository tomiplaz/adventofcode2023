import { readFileSync } from "fs";

const INPUT_FILENAME = "1/input.txt";
const NUMBER_MAP: Record<string, number> = {
  one : 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

const lines = getLinesFromFile(INPUT_FILENAME);
const values = lines.map(getValueFromLine);
for (let i = 0, l = lines.length; i < l; i++) {
  if (Number.isNaN(values[i])) console.log(i, lines[i], values[i]);
}
const result = values.reduce((prev, curr) => prev + curr, 0);

console.log(result);

function getLinesFromFile(path: string): string[] {
  try {
    return readFileSync(path, "utf8").split("\n");
  } catch (e) {
    console.error(e);
    return [];
  }
}

function getValueFromLine(line: string): number {
  const regex = /(one|two|three|four|five|six|seven|eight|nine|\d){1}/g;
  const matches: string[] = [];
  let execArr: RegExpExecArray | null; 
  while (execArr = regex.exec(line)) {
    matches.push(execArr[0]);
    regex.lastIndex = execArr.index + 1;
  }
  const nums = matches.map(m => NUMBER_MAP[m] ?? Number(m));
  return Number(`${nums[0] ?? 0}${nums[nums.length - 1] ?? 0}`);
}

