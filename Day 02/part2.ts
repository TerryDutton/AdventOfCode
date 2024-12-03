import { input } from "./input.ts";

type PredicateFn = (level: number, index: number, arr: number[]) => boolean;

const isAscendingFn: PredicateFn    = (lvl, i, arr) => i === 0 || lvl > arr[i-1];
const isDescendingFn: PredicateFn   = (lvl, i, arr) => i === 0 || lvl < arr[i-1];
const isNotTooVariedFn: PredicateFn = (lvl, i, arr) => i === 0 || Math.abs(lvl-arr[i-1]) < 4;

const everyWithIndex = (report: number[], predicateFn: PredicateFn) => {
    // .every() breaks if predicate returns false, so lastCheckedIndex will be where it failed
    let lastCheckedIndex = -1;
    const isEvery = report.every((level, i, arr) => {
        lastCheckedIndex = i;
        return i === 0 || predicateFn(level, i, arr);
    });
    return [isEvery, lastCheckedIndex] as const;
};

const isSafeReport = (report: number[]) => {
    const [isAscending, isAscendingFailedIndex] = everyWithIndex(report, isAscendingFn);
    const [isDescending, isDescendingFailedIndex] = everyWithIndex(report, isDescendingFn);
    const [isNotTooVaried, isNotTooVariedFailedIndex] = everyWithIndex(report, isNotTooVariedFn);
    const isSafe = (isAscending || isDescending) && isNotTooVaried;
    return { isSafe, isAscendingFailedIndex, isDescendingFailedIndex, isNotTooVariedFailedIndex };
};

const checkSafetyWithFailingIndex = (report: number[], failingIndex: number) => {
    // Remove element at index and re-check. If that doesn't work, remove element before index and re-check.
    let { isSafe } = isSafeReport(report.filter((_, i) => i !== failingIndex));
    if (!isSafe) ({ isSafe } = isSafeReport(report.filter((_, i) => i !== failingIndex - 1)));
    return isSafe;
};

const reports = input
    .split('\n')
    .map((str) => str
        .split(' ')
        .map((digits) => +digits)
    )
;

const safeReports = reports.filter((report) => {
    const { isSafe, isAscendingFailedIndex, isDescendingFailedIndex, isNotTooVariedFailedIndex } = isSafeReport(report);
    if (isSafe) return true;
    return [isAscendingFailedIndex, isDescendingFailedIndex, isNotTooVariedFailedIndex].some((failedIndex) => {
        return checkSafetyWithFailingIndex(report, failedIndex);
    });
});

console.log(safeReports.length);