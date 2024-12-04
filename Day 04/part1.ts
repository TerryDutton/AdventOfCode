import { input } from "./input.ts";

type Coords = [row: number, col: number];
type CoordsFn = (rowI: number, colI: number) => Coords[];
type CoordsMapFn = (rowI: number, colI: number, offset: number) => Coords;
type CoordsListFn  = (mapFn: CoordsMapFn, rowI: number, colI: number) => Coords[];

const getCoordsList: CoordsListFn = (mapFn, startingRow, startingColumn) => {
   return Array.from({ length: 4 }, (_, offset) => mapFn(startingRow, startingColumn, offset));
};
    
const createCoordsFn = (mapFn: CoordsMapFn): CoordsFn => getCoordsList.bind(null, mapFn);

const right     = createCoordsFn((row, col, offset) => [row, col + offset]);
const left      = createCoordsFn((row, col, offset) => [row, col - offset]);
const down      = createCoordsFn((row, col, offset) => [row + offset, col]);
const up        = createCoordsFn((row, col, offset) => [row - offset, col]);
const downRight = createCoordsFn((row, col, offset) => [row + offset, col + offset]);
const downLeft  = createCoordsFn((row, col, offset) => [row + offset, col - offset]);
const upRight   = createCoordsFn((row, col, offset) => [row - offset, col + offset]);
const upLeft    = createCoordsFn((row, col, offset) => [row - offset, col - offset]);

const coordFns = [right, left, down, up, downRight, downLeft, upRight, upLeft];

const countXmasesFromThisPoint = (table: string[], [row, col]: Coords) => {
    const getWord = (coords: Coords[]) => coords.map(([r, c]) => table[r]?.[c] || '%').join('');

    const words = coordFns.map((coordFn) => {
        const coords = coordFn(row, col);
        const word = getWord(coords);
        return word;
    });
    
    const xmases = words.filter((word) => word === 'XMAS');
    return xmases.length;
}

const lines = input.split(/\n/g);

const totalCount = lines.reduce((count, row, rowIndex, table) => {
    const lineCount = row.split('').reduce((acc, char, colIndex) => {
        if (char !== 'X') return acc;
        return acc + countXmasesFromThisPoint(table, [rowIndex, colIndex]);
    }, 0);
    return count + lineCount;
}, 0);

console.log(totalCount);
