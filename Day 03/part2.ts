import { fileReader } from "../utils/fileReader.ts";

const input = fileReader('./input.txt');
const cleanedInput = input
    .split(/(do\(\)|don't\(\))/g)
    .filter((_, i, arr) => arr[i-1] !== "don't()")
    .join()
;

const mulPattern = /mul\((\d+),(\d+)\)/g;
const matches = [...cleanedInput.matchAll(mulPattern)];

const answer = matches.reduce((acc, match) => {
    const [, strN1, strN2] = match;
    acc += (+strN1 * +strN2);
    return acc;
}, 0);

console.log(answer);