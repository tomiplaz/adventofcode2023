import { getLinesFromFile } from "../utils";

type GameSubset = { red: number; green: number; blue: number };
type Game = { id: number; subsets: GameSubset[] };

const INPUT_FILENAME = "2/input.txt";
const BAG: GameSubset = { red: 12, green: 13, blue: 14 };

const lines = getLinesFromFile(INPUT_FILENAME);
const games = lines.map(getGameFromLine);
const result = games.reduce((acc, game) => {
  for (const color in BAG) {
    const c = color as keyof GameSubset;
    for (const subset of game.subsets) {
      if (subset[c] > BAG[c]) {
        return acc;
      }
    }
  }
  return acc + game.id;
}, 0);

console.log(result);

function getGameFromLine(line: string): Game {
  const [gameStr, subsetsStr] = line.split(": ");
  const id = Number(gameStr.substring(gameStr.indexOf(" ") + 1));
  const subsetsParts = subsetsStr.split("; ");
  const subsets = subsetsParts.map(getSubsetFromStr);
  return { id, subsets };
}

function getSubsetFromStr(str: string): GameSubset {
  const res: GameSubset = { red: 0, green: 0, blue: 0 };
  const parts = str.split(", ");
  for (const part of parts) {
    const [countStr, color] = part.split(" ");
    res[color as keyof GameSubset] = Number(countStr);
  }
  return res;
}

