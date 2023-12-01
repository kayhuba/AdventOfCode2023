console.log("Day 01, Puzzle 01!")

import lineReader from "line-reader";

let sum: number = 0;
lineReader.eachLine("./input/input.txt", (line, last) => {
    const matches = [...line.matchAll(/\d/g)];
    if (matches) {
        const combined: string = matches[0][0] + matches[matches.length - 1][0];
        sum += parseInt(combined);
    }

    if (last) {
        console.log(`Sum: ${sum}`);
    }
});
