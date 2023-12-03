import { getLinesFromFile } from "../utils";

type Matrix = string[][];
type Pos = [number, number];
type PosNum = [Pos, number];

const INPUT_FILENAME = "3/input.txt";
const NON_SYM_CHARS = '0123456789.';

const lines = getLinesFromFile(INPUT_FILENAME);
const matrix = getMatrixFromLines(lines);
const posNums = getPosNumsFromLines(lines);
const symAdjPosNums = posNums.filter(pn => isPosNumSymAdj(pn, matrix));
const result = symAdjPosNums.reduce((prev, curr) => {
  return prev + curr[1];
}, 0);

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

function isPosNumSymAdj(posNum: PosNum, matrix: Matrix): boolean {
  const adjChars = getPosNumAdjChars(posNum, matrix);
  return adjChars.some(c => !NON_SYM_CHARS.includes(c));
}

function getPosNumAdjChars([pos, num]: PosNum, matrix: Matrix): string[] {
  const numL = `${num}`.length;
  const indexMoves = [
    -1,
    ...Array.from({ length: numL }).map((_, i) => i),
    numL
  ];
  const topAdjChars = indexMoves.map(v => {
    return matrix[pos[0] - 1]?.[pos[1] + v];
  });
  const middleAdjChars = [
    matrix[pos[0]]?.[pos[1] - 1],
    matrix[pos[0]]?.[pos[1] + numL],
  ];
  const bottomAdjChars = indexMoves.map(v => {
    return matrix[pos[0] + 1]?.[pos[1] + v];
  });
  return [
    ...topAdjChars,
    ...middleAdjChars,
    ...bottomAdjChars
  ].filter(v => v !== undefined);
}

