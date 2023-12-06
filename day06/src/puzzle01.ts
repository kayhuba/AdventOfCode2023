console.log("Day 06, Puzzle 01!")

import lineReader from "line-reader";

let times: number[];
let recordDistances: number[];
lineReader.eachLine("./input/input.txt", (line, last) => {
    const timeMatch = line.match(/^Time:\s*((\s*(\d+))+)$/);
    if (timeMatch) {
        times = timeMatch[1]
            .split(" ")
            .filter(element => element.trim().length > 0)
            .map(num => parseInt(num));

    }
    const distanceMatch = line.match(/^Distance:\s*((\s*(\d+))+)$/);
    if (distanceMatch) {
        recordDistances = distanceMatch[1]
            .split(" ")
            .filter(element => element.trim().length > 0)
            .map(num => parseInt(num));
    }

    if (last) {
        const races = times.map(time => {
            const distances: number[] = [];
            for (let i=0; i < time; i++) {
                distances.push(i * time - Math.pow(i, 2));
            }
            return distances;
        });
        const wonRaces = races
            .map((distances, index) =>
                distances.filter(distance => distance > recordDistances[index]));
        const marginOfError = wonRaces.reduce((sum, winningDistances) => sum *= winningDistances.length, 1);
        console.log(`Margin of error: ${marginOfError}`);
    }
});
