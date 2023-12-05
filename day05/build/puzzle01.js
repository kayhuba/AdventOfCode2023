"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 05, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
let readStateCounter = -1;
let seeds;
const ranges = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    const seedMatches = line.match(/^seeds:((?: \d+)+)$/);
    const newMapMatches = line.match(/^.* map:/);
    const rangeMatches = line.match(/(\d+) (\d+) (\d+)/);
    if (seedMatches) {
        seeds = seedMatches[1].substring(1).split(" ").map(raw => parseInt(raw));
    }
    else if (newMapMatches) {
        readStateCounter++;
        ranges[readStateCounter] = [];
    }
    else if (rangeMatches) {
        const targetStart = parseInt(rangeMatches[1]);
        const sourceStart = parseInt(rangeMatches[2]);
        const len = parseInt(rangeMatches[3]);
        const range = {
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
            for (let i = 0; i < ranges.length; i++) {
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
//# sourceMappingURL=puzzle01.js.map