console.log("Day 06, Puzzle 02!")

import lineReader from "line-reader";

let time: number;
let recordDistance: number;
lineReader.eachLine("./input/input.txt", (line, last) => {
    const timeMatch = line.match(/^Time:\s*((\s*(\d+))+)$/);
    if (timeMatch) {
        time = parseInt(timeMatch[1].replaceAll(" ", ""));
    }
    const distanceMatch = line.match(/^Distance:\s*((\s*(\d+))+)$/);
    if (distanceMatch) {
        recordDistance = parseInt(distanceMatch[1].replaceAll(" ", ""));
    }

    if (last) {
        const distances: number[] = [];
        for (let i=0; i < time; i++) {
            distances.push(i * time - Math.pow(i, 2));
        }

        const winningDistances = distances.filter(distance => distance > recordDistance);
        console.log(`Ways to beat the record: ${winningDistances.length}`);
    }
});
