import { pageOrderingRules, pagesToPrint } from "./input.ts";

const parseInput = (input: string, delimiter: string) => input
    .split(/\n/g)
    .map((subStr) => subStr
    .split(delimiter))
;
const rulesList = parseInput(pageOrderingRules, '|');
const toPrint = parseInput(pagesToPrint, ',');

const rulesDict = rulesList.reduce((acc, [page, pageAfter]) => {
    if (!acc[page]) acc[page] = new Set();
    acc[page].add(pageAfter);
    return acc;
}, {} as { [key: string]: Set<string> });

const isPageOutOfOrder = (page: string, prevPages: string[]) => {
    const pagesAfter = rulesDict[page];
    return prevPages.some((prevPage) => pagesAfter.has(prevPage));
}

const sortIntoPrintOrder = (p1: string, p2: string) => {
    const pagesAfterP1 = rulesDict[p1];
    const pagesAfterP2 = rulesDict[p2];
    if (pagesAfterP1.has(p2)) return -1;
    if (pagesAfterP2.has(p1)) return 1;
    return 0;
};

const badPages = toPrint.filter((pages) => {
    return pages.some((page, i) => isPageOutOfOrder(page, pages.slice(0, i)));
});

const answer = badPages.reduce((acc, pages) => {
    const correctOrder = pages.slice().sort(sortIntoPrintOrder);
    acc += +correctOrder[Math.floor(correctOrder.length / 2)];
    return acc;
}, 0);

console.log(answer);