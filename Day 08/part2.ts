import { input } from "./input.ts";

type Coords = readonly [number, number];

const table = input.split(/\n/g);
const tableCopy = table.map((row) => row.split(''));

const constrainCoords = (coords: Coords) => {
    const lowerBound = table.length;
    const rightBound = table[0].length;
    const [row, col] = coords;
    const isWithinMap = row >= 0 && row < lowerBound && col >= 0 && col < rightBound;
    if (isWithinMap) {
        tableCopy[row][col] = '#';
    }
    return isWithinMap ? coords : null;
};

const calculateAntinodePositions = (node1: Coords, node2: Coords, multiplier: number) => {
    const [n1Row, n1Col] = node1;
    const [n2Row, n2Col] = node2;
    const rowOffset = (n2Row - n1Row) * multiplier;
    const colOffset = (n2Col - n1Col) * multiplier;
    const an1 = [n1Row - rowOffset, n1Col - colOffset] as const;
    const an2 = [n2Row + rowOffset, n2Col + colOffset] as const;
    return [constrainCoords(an1), constrainCoords(an2)];
};

const antennaCoords = table.reduce((acc, row, rowI) => {
    row.split('').forEach((char, colI) => {
        if (char === '.') return;
        if (!(char in acc)) acc[char] = [];
        acc[char].push([rowI, colI]);
    });
    return acc;
}, {} as { [key: string]: Coords[] });

const antinodes = Object.values(antennaCoords).reduce((acc, coordsList) => {
    coordsList.forEach((coordPair, i) => {
        const otherCoords = coordsList.slice(i + 1);
        otherCoords.forEach((otherPair) => {
            let an1: Coords | null, an2: Coords | null;
            let count = 0;
            do {
                [an1, an2] = calculateAntinodePositions(coordPair, otherPair, count);
                if (an1) acc.add(`${an1[0]},${an1[1]}`);
                if (an2) acc.add(`${an2[0]},${an2[1]}`);
                count++;
            } while (an1 || an2)
        });
    });
    return acc;
}, new Set<`${number},${number}`>());

console.log(antinodes.size);