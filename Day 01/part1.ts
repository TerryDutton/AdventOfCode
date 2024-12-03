import { input } from "./input.ts";

const { list1, list2 } = input
    .split(/\n/g)
    .reduce((acc, pair) => {
        const [str1, str2] = pair.split('   ');
        acc.list1.push(+str1);
        acc.list2.push(+str2);
        return acc;
    }, { list1: [] as number[], list2: [] as number[] })
;

const sortAscending = (thisN: number, thatN: number) => thisN - thatN;
list1.sort(sortAscending);
list2.sort(sortAscending);

const answer = list1.reduce((acc, n1, i) => {
    const n2 = list2[i];
    acc += Math.abs(n1 - n2);
    return acc;
}, 0);

console.log(answer);