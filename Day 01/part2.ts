import { input } from "./input.ts";

const { list1, list2 } = input
    .split(/\n/g)
    .reduce((acc, pair) => {
        const [str1, str2] = pair.split('   ');
        acc.list1.add(+str1);
        acc.list2.push(+str2);
        return acc;
    }, { list1: new Set<number>(), list2: [] as number[] })
;

const answer = list2.reduce((acc, n) => {
    if (list1.has(n)) acc += n;
    return acc;
}, 0);

console.log(answer);