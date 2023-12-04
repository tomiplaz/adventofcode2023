import { readFileSync } from "fs";

export function getLinesFromFile(path: string): string[] {
  try {
    return readFileSync(path, "utf8")
      .split("\n")
      .filter(v => v !== "");
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function sum(nums: number[]): number {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

