import { input } from "./input.ts";

const table = input.split(/\n/g);
const getChar = (r: number, c: number) => table[r]?.[c] || '%';

const totalCount = table.reduce((count, row, rowI) => {
    const lineCount = row.split('').reduce((acc, char, colI) => {
        if (char !== 'A') return acc;
        
        const upLeft    = getChar(rowI-1, colI-1);
        const upRight   = getChar(rowI-1, colI+1);
        const downLeft  = getChar(rowI+1, colI-1);
        const downRight = getChar(rowI+1, colI+1);

        const word1 = [upLeft, char, downRight].join('');
        const word2 = [upRight, char, downLeft].join('');
        
        const isMas = (str: string) => str === 'MAS' || str === 'SAM';
        if (isMas(word1) && isMas(word2)) acc++;
        return acc;
    }, 0);
    return count + lineCount;
}, 0);

console.log(totalCount);