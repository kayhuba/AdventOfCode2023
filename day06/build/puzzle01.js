"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 06, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
let times;
let recordDistances;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
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
            const distances = [];
            for (let i = 0; i < time; i++) {
                distances.push(i * time - Math.pow(i, 2));
            }
            return distances;
        });
        const wonRaces = races
            .map((distances, index) => distances.filter(distance => distance > recordDistances[index]));
        const marginOfError = wonRaces.reduce((sum, winningDistances) => sum *= winningDistances.length, 1);
        console.log(`Margin of error: ${marginOfError}`);
    }
});
//# sourceMappingURL=puzzle01.js.map