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

const isPageInOrder = (page: string, prevPages: string[]) => {
    const pagesAfter = rulesDict[page];
    return prevPages.every((prevPage) => !pagesAfter.has(prevPage));
}

const answer = toPrint.reduce((count, pages) => {
    const isInOrder = pages.every((page, i) => isPageInOrder(page, pages.slice(0, i)));
    if (isInOrder) count += +pages[Math.floor(pages.length / 2)];
    return count;
}, 0);

console.log(answer);