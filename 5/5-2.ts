import { getLinesFromFile, getNumsFromStr } from "../utils";

type RangeMap = [destStart: number, sourceStart: number, length: number];
type MapName =
  "seed-to-soil" |
  "soil-to-fertilizer" |
  "fertilizer-to-water" |
  "water-to-light" |
  "light-to-temperature" |
  "temperature-to-humidity" |
  "humidity-to-location";
type Maps = Record<MapName, RangeMap[]>;
type SeedPair = [start: number, length: number];

const INPUT_FILENAME = "5/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME, false);
const seedPairs = getSeedPairs(lines[0]);
const maps = getMaps(lines);
const mapsArr = mapsToMapsArr(maps);

const minLocs: number[] = [];
for (const pair of seedPairs) {
  const seeds = getSeedsFromPair(pair);
  const locations = getLocations(seeds, mapsArr);
  const minLoc = getMin(locations);
  minLocs.push(minLoc);
}
const result = getMin(minLocs);

console.log(result);

function getSeedPairs(str: string): SeedPair[] {
  const nums = getNumsFromStr(str);
  const seedPairs: SeedPair[] = [];
  for (let i = 0, l = nums.length; i < l; i += 2) {
    seedPairs.push([nums[i], nums[i + 1]]);
  }
  return seedPairs;
}

function getSeedsFromPair([start, length]: SeedPair): number[] {
  let seeds: number[] = [];
  for (let s = start, l = start + length; s < l; s++) {
    seeds.push(s);
  }
  return seeds;
}

function getMaps(lines: string[]): Maps {
  const maps: Maps = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": []
  };
  const names = Object.keys(maps);
  for (const name of names) {
    const startIndex = lines.indexOf(`${name} map:`) + 1;
    const endIndex = lines.slice(startIndex).indexOf("") + startIndex;
    const mapLines = lines.slice(startIndex, endIndex);
    maps[name as keyof Maps] = mapLines.map(getNumsFromStr) as RangeMap[];
  }
  return maps;
}

function mapsToMapsArr(maps: Maps): RangeMap[][] {
  return [
    maps["seed-to-soil"],
    maps["soil-to-fertilizer"],
    maps["fertilizer-to-water"],
    maps["water-to-light"],
    maps["light-to-temperature"],
    maps["temperature-to-humidity"],
    maps["humidity-to-location"]
  ];
}

function getLocations(seeds: number[], mapsArr: RangeMap[][]): number[] {
  let result: number[] = seeds;
  for (const map of mapsArr) {
    result = getDestination(result, map);
  }
  return result;
}

function getDestination(source: number[], rangeMaps: RangeMap[]): number[] {
  return source.map(v => {
    const rangeMap = rangeMaps.find(([, sourceStart, length]) => {
      return v >= sourceStart && v <= sourceStart + length;
    });
    return rangeMap ? rangeMap[0] + v - rangeMap[1] : v;
  });
}

function getMin(nums: number[]): number {
  let min = Infinity;
  for (const num of nums) {
    if (num < min) {
      min = num;
    }
  }
  return min;
}

