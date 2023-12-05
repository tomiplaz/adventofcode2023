import { readFileSync } from "fs";

export function getLinesFromFile(path: string, dropEmpty = true): string[] {
  try {
    const lines = readFileSync(path, "utf8").split("\n");
    return dropEmpty ? lines.filter(v => v !== "") : lines;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function sum(nums: number[]): number {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

export function getNumsFromStr(str: string): number[] {
  return str.match(/\d+/g)?.map(Number) ?? [];
};

