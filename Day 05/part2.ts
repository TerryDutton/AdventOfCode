import { pageOrderingRules as por, pagesToPrint as p2p } from "./input.ts";

const toNumberLists = (input: string, delimiter: string) => input
    .split(/\n/g)
    .map((subStr) => subStr
        .split(delimiter)
        .map((char) => +char
    )
);
const porList = toNumberLists(por, '|');
const toPrint = toNumberLists(p2p, ',');

const porDict = porList.reduce((acc, [isBefore, isAfter]) => {
    if (!acc[isBefore]) acc[isBefore] = new Set();
    acc[isBefore].add(isAfter);
    return acc;
}, {} as { [key: number]: Set<number> });

const sortIntoPrintOrder = (p1: number, p2: number) => {
    const pagesAfterP1 = porDict[p1];
    const pagesAfterP2 = porDict[p2];
    if (pagesAfterP1.has(p2)) return -1;
    if (pagesAfterP2.has(p1)) return 1;
    return 0;
};

const answer = toPrint.reduce((acc, pages) => {
    const correctOrder = pages.slice().sort(sortIntoPrintOrder);
    const isOutOfOrder = pages.some((page, i) => page !== correctOrder[i]);
    if (isOutOfOrder) acc += correctOrder[Math.floor(correctOrder.length / 2)];
    return acc;
}, 0);

console.log(answer);