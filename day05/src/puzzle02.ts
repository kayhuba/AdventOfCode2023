console.log("Day 05, Puzzle 02!")

import lineReader from "line-reader";

interface RangeMap {
    start: number,
    end: number,
    offsetToTarget: number
}

interface Range {
    start: number,
    end: number
}

let readStateCounter = -1;
let seeds: Range[] = [];
const ranges: RangeMap[][] = [];

lineReader.eachLine("./input/input.txt", (line, last) => {
    const seedMatches = line.match(/^seeds:(.*)$/);
    const newMapMatches = line.match(/^.* map:/);
    const rangeMatches = line.match(/(\d+) (\d+) (\d+)/);

    if (seedMatches) {
        const pairRegex = / (\d+) (\d+)/g;
        const rawSeeds = seedMatches[1];
        let pair;
        while ((pair = pairRegex.exec(rawSeeds)) !== null) {
            const start = parseInt(pair[1]);
            const len = parseInt(pair[2]);
            seeds.push({
                start: start,
                end: start + len - 1
            });
        }
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

        let nextTravellers: Range[] = seeds;
        for (let i= 0; i < ranges.length; i++) {
            const currentTravellers = nextTravellers;
            nextTravellers = [];
            let traveller;
            let n=0;
            loop1: while ((traveller = currentTravellers[n++]) !== undefined) {
                for (let j=0; j < ranges[i].length; j++) {
                    // full intersection?
                    if (traveller.start >= ranges[i][j].start && traveller.end <= ranges[i][j].end) {
                        // yes -> simple case
                        traveller.start += ranges[i][j].offsetToTarget;
                        traveller.end += ranges[i][j].offsetToTarget;
                        nextTravellers.push(traveller);
                        continue loop1;
                    }

                    // partial intersection
                    // split traveller into two at the intersect
                    if (traveller.start < ranges[i][j].start && traveller.end >= ranges[i][j].start) {
                        nextTravellers.push({
                            start: traveller.start,
                            end: ranges[i][j].start - 1
                        });

                        nextTravellers.push({
                            start: ranges[i][j].start + ranges[i][j].offsetToTarget,
                            end: traveller.end + ranges[i][j].offsetToTarget
                        });
                        continue loop1;
                    } else if (traveller.start <= ranges[i][j].end && traveller.end > ranges[i][j].end) {
                        nextTravellers.push({
                            start: traveller.start + ranges[i][j].offsetToTarget,
                            end: ranges[i][j].end + ranges[i][j].offsetToTarget
                        });

                        // we need to check the remainder again
                        currentTravellers.push({
                            start: ranges[i][j].end + 1,
                            end: traveller.end
                        });
                        continue loop1;
                    }
                }

                nextTravellers.push(traveller);
            }
        }

        nextTravellers.sort((a, b) => a.start - b.start);

        console.log(`Closest location ${nextTravellers[0].start}`);
    }
});
