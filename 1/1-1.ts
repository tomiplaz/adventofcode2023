import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "1/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const values = lines.map(getValueFromLine);
const result = values.reduce((prev, curr) => prev + curr, 0);

console.log(result);

function getValueFromLine(line: string): number {
  const nums = line.match(/\d{1}/g)?.map(Number) ?? [0];
  return Number(`${nums[0]}${nums[nums.length - 1]}`);
}

