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

const INPUT_FILENAME = "5/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME, false);
const seeds = getNumsFromStr(lines[0]);
const maps = getMaps(lines);

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

