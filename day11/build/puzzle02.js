"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 11, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
const galaxies = [];
let adjustedRowNum = 0;
const occupiedColumn = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        let fillOccupiedColumn = occupiedColumn.length === 0;
        let hasGalaxy = false;
        line.split("").forEach((element, index) => {
            // we do not filter the array or we loose the index...
            if (element === "#") {
                occupiedColumn[index] = true;
                hasGalaxy = true;
                galaxies.push({
                    x: index,
                    y: adjustedRowNum
                });
            }
            else {
                if (fillOccupiedColumn) {
                    occupiedColumn[index] = false;
                }
            }
        });
        adjustedRowNum += (hasGalaxy ? 1 : 1000000);
    }
    if (last) {
        // adjust coordinates for empty space in columns
        let adjustedIndex = 0;
        const adjustedGalaxies = [];
        occupiedColumn.forEach((occupied, index) => {
            galaxies.forEach(galaxy => {
                if (galaxy.x === index) {
                    adjustedGalaxies.push({
                        x: adjustedIndex,
                        y: galaxy.y
                    });
                }
            });
            adjustedIndex += (occupied ? 1 : 1000000);
        });
        // get all pairs of galaxies
        const galaxyPairs = [];
        for (let i = 0; i < adjustedGalaxies.length - 1; i++) {
            for (let j = i + 1; j < adjustedGalaxies.length; j++) {
                galaxyPairs.push([i, j]);
            }
        }
        let shortestPathSum = 0;
        galaxyPairs.forEach(pair => {
            let galaxy1;
            let galaxy2;
            galaxy1 = adjustedGalaxies[pair[0]];
            galaxy2 = adjustedGalaxies[pair[1]];
            let xDistance = Math.abs(galaxy2.x - galaxy1.x);
            let yDistance = Math.abs(galaxy2.y - galaxy1.y);
            let steps = xDistance + yDistance;
            shortestPathSum += steps;
        });
        console.log(`The sum of shortest path between all galaxies: ${shortestPathSum}`);
    }
});
//# sourceMappingURL=puzzle02.js.map