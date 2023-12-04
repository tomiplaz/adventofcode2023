import { getLinesFromFile, sum } from "../utils";

type Matrix = string[][];
type Pos = [number, number];
type PosNum = [Pos, number];
type GearNums = Record<string, number[]>;

const INPUT_FILENAME = "3/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const matrix = getMatrixFromLines(lines);
const posNums = getPosNumsFromLines(lines);
const gearsNums = getGearsNums(posNums, matrix);
const validGearsRatios = getValidGearsRatios(gearsNums);
const result = sum(validGearsRatios);

console.log(result);

function getMatrixFromLines(lines: string[]): Matrix {
  return lines.map(l => l.split(''));
}

function getPosNumsFromLines(lines: string[]): PosNum[] {
  const res: PosNum[] = [];
  const regex = /\d+/g;
  let match: RegExpExecArray | null;
  for (let i = 0, l = lines.length; i < l; i++) {
    while (match = regex.exec(lines[i])) {
      res.push([[i, match.index], Number(match[0])]);
    }
  }
  return res;
}

function getGearsNums(posNums: PosNum[], matrix: Matrix): GearNums {
  const res: GearNums = {};
  for (const posNum of posNums) {
    const adjGears = getPosNumAdjGears(posNum, matrix);
    for (const gear of adjGears) {
      res[gear] = res[gear] === undefined
        ? [posNum[1]]
        : [...res[gear], posNum[1]];
    }
  }
  return res;
}

function getValidGearsRatios(gearNums: GearNums): number[] {
  return Object
    .entries(gearNums)
    .filter(([, nums]) => nums.length === 2)
    .map(([, nums]) => nums[0] * nums[1]);
}

function getPosNumAdjGears([pos, num]: PosNum, matrix: Matrix): string[] {
  const res: string[] = [];
  const numL = `${num}`.length;
  const indexMoves = [
    -1,
    ...Array.from({ length: numL }).map((_, i) => i),
    numL
  ];
  const adjPos: Pos[] = [];
  for (const v of indexMoves) {
    adjPos.push([pos[0] - 1, pos[1] + v]);
    adjPos.push([pos[0] + 1, pos[1] + v]);
  }
  adjPos.push([pos[0], pos[1] - 1]);
  adjPos.push([pos[0], pos[1] + numL]);
  for (const pos of adjPos) {
    if (matrix[pos[0]]?.[pos[1]] === "*") {
      res.push(`${pos[0]},${pos[1]}`);
    }
  }
  return res;
}

