import * as fs from "node:fs";

export const fileReader = (path: string): string => {
    return fs.readFileSync(path).toString();
};