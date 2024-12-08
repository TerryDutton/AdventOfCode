import { input } from "./input.ts";

type OpFn = (a: number, b: number) => number;

const operations: OpFn[] = [
    (a,b) => a+b,
    (a,b) => a*b,
    (a,b) => +`${a}${b}`,
];

const getAllSumsOfTwoNumbers = (a: number, b: number) => {
    return operations.map((opFn) => opFn(a, b));
}

const getAllSumsOfManyNumbers = (nums: number[]): number[] => {
    const l = nums.length;
    if (l < 2) return nums;
    const [n1, n2, ...rest] = nums;
    const sums = getAllSumsOfTwoNumbers(n1, n2);
    if (l === 2) return sums;
    return sums.flatMap((sum) => getAllSumsOfManyNumbers([sum, ...rest]));
};

const canNumbersMakeAnswer = (answer: number, nums: number[]) => {
    const sums = getAllSumsOfManyNumbers(nums);
    return sums.some((sum) => sum === answer);
};

const calibrations = input
    .split(/\n/g)
    .map((str) => {
        const [answerStr, numStr] = str.split(': ');
        const answer = +answerStr;
        const nums = numStr.split(' ').map((nStr) => +nStr);
        return [answer, nums] as const;
    })
;

const result = calibrations.reduce((acc, cal) => {
    const [answer, nums] = cal;
    const isPossible = canNumbersMakeAnswer(answer, nums);
    if (isPossible) acc += answer;
    return acc;
}, 0);

console.log(result);