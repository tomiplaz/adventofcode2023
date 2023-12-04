import { getLinesFromFile } from "../utils";

type CardNumbers = [winning: number[], have: number[]];

const INPUT_FILENAME = "4/input.txt";
const NUM_REGEX = /\d+/g;

const lines = getLinesFromFile(INPUT_FILENAME);
const cardsNums = lines.map(getCardNumbers);
const cardsWinCounts = cardsNums.map(getCardWinCount);
const result = cardsWinCounts.reduce((prev, curr, i, arr) => {
  return prev + 1 + getCardWinCopyCount(curr, i, arr);
}, 0);

console.log(result);

function getCardNumbers(line: string): CardNumbers {
  const [winning, have] = line.split(":")[1].split("|");
  return [
    winning.match(NUM_REGEX)?.map(Number) ?? [],
    have.match(NUM_REGEX)?.map(Number) ?? []
  ];
}

function getCardWinCount([winning, have]: CardNumbers): number {
  let count = 0;
    for (let i = 0, l = winning.length; i < l; i++) {
      if (have.includes(winning[i])) {
        count++;
      }
    }
  return count;
}

function getCardWinCopyCount(
  cardWinCount: number,
  cardIndex: number,
  cardsWinCounts: number[]
): number {
  if (cardWinCount === 0) {
    return 0;
  }
  const childrenWinCount = Array
    .from({ length: cardWinCount })
    .map((_, i) => cardIndex + i + 1)
    .map(v => getCardWinCopyCount(cardsWinCounts[v], v, cardsWinCounts))
    .reduce((prev, curr) => prev + curr, 0);
  return cardWinCount + childrenWinCount;
}

