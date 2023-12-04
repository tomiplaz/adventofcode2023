import { getLinesFromFile } from "../utils";

type CardNumbers = [number[], number[]];

const INPUT_FILENAME = "4/input.txt";
const NUM_REGEX = /\d+/g;

const lines = getLinesFromFile(INPUT_FILENAME);
const cardsNums = lines.map(getCardNumbers);
const cardsScores = cardsNums.map(getCardScore);
const result = cardsScores.reduce((prev, curr) => prev + curr, 0);

console.log(result);

function getCardNumbers(line: string): CardNumbers {
  const [winning, have] = line.split(":")[1].split("|");
  return [
    winning.match(NUM_REGEX)?.map(Number) ?? [],
    have.match(NUM_REGEX)?.map(Number) ?? []
  ];
}

function getCardScore([winning, have]: CardNumbers) {
  let count = 0;
  for (let i = 0, l = winning.length; i < l; i++) {
    if (have.includes(winning[i])) {
      count++;
    }
  }
  return count === 0 ? 0 : Math.pow(2, count - 1);
}

