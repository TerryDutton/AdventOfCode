import { input } from "./input.ts";

type PredicateFn = (level: number, i: number, arr: number[]) => boolean;

const isAscendingFn: PredicateFn    = (lvl, i, arr) => i === 0 || lvl > arr[i-1];
const isDescendingFn: PredicateFn   = (lvl, i, arr) => i === 0 || lvl < arr[i-1];
const isNotTooVariedFn: PredicateFn = (lvl, i, arr) => i === 0 || Math.abs(lvl-arr[i-1]) < 4;

const reports = input
    .split('\n')
    .map((str) => str
        .split(' ')
        .map((digits) => +digits)
    )
;

const safeReports = reports.filter((report) => {
    const isAsc  = report.every(isAscendingFn);
    const isDesc = report.every(isDescendingFn);
    return (isAsc || isDesc) && report.every(isNotTooVariedFn);
});

console.log(safeReports.length);