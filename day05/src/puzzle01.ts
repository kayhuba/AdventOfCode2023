console.log("Day 05, Puzzle 01!")

import lineReader from "line-reader";

interface RangeMap {
    start: number,
    end: number,
    offsetToTarget: number
}

let readStateCounter = -1;
let seeds: number[];
const ranges: RangeMap[][] = [];

lineReader.eachLine("./input/input.txt", (line, last) => {
    const seedMatches = line.match(/^seeds:((?: \d+)+)$/);
    const newMapMatches = line.match(/^.* map:/);
    const rangeMatches = line.match(/(\d+) (\d+) (\d+)/);

    if (seedMatches) {
        seeds = seedMatches[1].substring(1).split(" ").map(raw => parseInt(raw));
    } else if (newMapMatches) {
        readStateCounter++;
        ranges[readStateCounter] = [];
    } else if (rangeMatches) {
        const targetStart = parseInt(rangeMatches[1]);
        const sourceStart = parseInt(rangeMatches[2]);
        const len = parseInt(rangeMatches[3]);
        const range: RangeMap = {
            start: sourceStart,
            end: sourceStart + len - 1,
            offsetToTarget: targetStart - sourceStart
        };

        ranges[readStateCounter].push(range);
    }

    if (last) {
        ranges.forEach(range => range.sort((a, b) => a.start - b.start));

        const locations = seeds.map(seed => {
            let travellingSeed = seed;
            for (let i= 0; i < ranges.length; i++) {
                let matchedRange = ranges[i].filter(range => (travellingSeed >= range.start && travellingSeed <= range.end));
                if (matchedRange.length > 0) {
                    travellingSeed += matchedRange[0].offsetToTarget;
                    break;
                }
            }
            return travellingSeed;
        });

        locations.sort((a, b) => a - b);
        console.log(`Closest location ${locations[0]}`);
    }
});
