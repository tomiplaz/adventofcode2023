import { getLinesFromFile } from "../utils";

type Subset = { red: number; green: number; blue: number };
type Game = { id: number; subsets: Subset[] };

const INPUT_FILENAME = "2/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const games = lines.map(getGameFromLine);
const powers = games.map(getGamePower);
const result = powers.reduce((prev, curr) => prev + curr, 0);

console.log(result);

function getGameFromLine(line: string): Game {
  const [gameStr, subsetsStr] = line.split(": ");
  const id = Number(gameStr.substring(gameStr.indexOf(" ") + 1));
  const subsetsParts = subsetsStr.split("; ");
  const subsets = subsetsParts.map(getSubsetFromStr);
  return { id, subsets };
}

function getSubsetFromStr(str: string): Subset {
  const res: Subset = { red: 0, green: 0, blue: 0 };
  const parts = str.split(", ");
  for (const part of parts) {
    const [countStr, color] = part.split(" ");
    res[color as keyof Subset] = Number(countStr);
  }
  return res;
}

function getGamePower(game: Game): number {
  return Object
    .values(getGameMinSubset(game))
    .reduce((prev, curr) => prev * curr, 1);
}

function getGameMinSubset({ subsets }: Game): Subset {
  const res: Subset = { red: 0, green: 0, blue: 0 };
  for (const color in res) {
    const c = color as keyof Subset;
    res[c] = Math.max(...subsets.map(s => s[c]).filter(Boolean));
  }
  return res;
}

