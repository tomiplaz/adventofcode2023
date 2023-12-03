import { readFileSync } from "fs";

export function getLinesFromFile(path: string): string[] {
  try {
    return readFileSync(path, "utf8").split("\n");
  } catch (e) {
    console.error(e);
    return [];
  }
}

