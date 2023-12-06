"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 06, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
let time;
let recordDistance;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    const timeMatch = line.match(/^Time:\s*((\s*(\d+))+)$/);
    if (timeMatch) {
        time = parseInt(timeMatch[1].replaceAll(" ", ""));
    }
    const distanceMatch = line.match(/^Distance:\s*((\s*(\d+))+)$/);
    if (distanceMatch) {
        recordDistance = parseInt(distanceMatch[1].replaceAll(" ", ""));
    }
    if (last) {
        const distances = [];
        for (let i = 0; i < time; i++) {
            distances.push(i * time - Math.pow(i, 2));
        }
        const winningDistances = distances.filter(distance => distance > recordDistance);
        console.log(`Ways to beat the record: ${winningDistances.length}`);
    }
});
//# sourceMappingURL=puzzle02.js.map