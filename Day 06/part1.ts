import { input } from "./input.ts";

const table = input.split(/\n/g).map((row) => row.split(''));

let [currentRow, currentCol] = (() => {
    const isGuard = /^\^|<|>|v$/;
    let currCol = -1;
    
    const currRow = table.findIndex((row) => row.some((char, i) => {
        currCol = i;
        return isGuard.test(char);
    }));
    
    return [currRow, currCol];
})();

const guards = {
    up: '^',
    down: 'v',
    left: '<',
    right: '>'
};

const guardTurnOrder = [guards.up, guards.right, guards.down, guards.left];

const turnGuard = (guard: string) => {
    const guardAt = guardTurnOrder.indexOf(guard);
    return guardTurnOrder[(guardAt + 1) % 4];
};

const nextCoords = (guard: string) => {
    const nextRow = currentRow + (guard === guards.up ? -1 : guard === guards.down ? 1 : 0);
    const nextCol = currentCol + (guard === guards.left ? -1 : guard === guards.right ? 1 : 0);
    return [nextRow, nextCol];
};

const changeCurrentSquare = (newSymbol: string) => {
    table[currentRow][currentCol] = newSymbol;
};

let count = 1;
let guardIsStillHere = true;

while(guardIsStillHere) {
    const guard = table[currentRow][currentCol];
    const [nextRow, nextCol] = nextCoords(guard);
    const nextSquare = table[nextRow]?.[nextCol];

    if (nextSquare === '#') changeCurrentSquare(turnGuard(guard));
    else {
        if (nextSquare === '.') count++;
        changeCurrentSquare('%');
        currentRow = nextRow;
        currentCol = nextCol;
        if (!nextSquare) guardIsStillHere = false;
        else changeCurrentSquare(guard);
    }
}

console.log(count);