import { fileReader } from "../utils/fileReader.ts";

const input = fileReader('./input.txt');
const mulPattern = /mul\((\d+),(\d+)\)/g;
const matches = [...input.matchAll(mulPattern)];

const answer = matches.reduce((acc, match) => {
    const [, strN1, strN2] = match;
    acc += (+strN1 * +strN2);
    return acc;
}, 0);

console.log(answer);