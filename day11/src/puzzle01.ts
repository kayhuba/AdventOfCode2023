console.log("Day 11, Puzzle 01!")

import lineReader from "line-reader";

interface Position {
    x: number,
    y: number
}

const galaxies: Position[] = [];
let adjustedRowNum = 0;
const  occupiedColumn: boolean[] = [];
lineReader.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        let fillOccupiedColumn = occupiedColumn.length === 0;
        let hasGalaxy: boolean = false;
        line.split("").forEach((element, index) => {
            // we do not filter the array or we loose the index...

            if (element === "#") {
                occupiedColumn[index] = true;
                hasGalaxy = true;
                galaxies.push({
                    x: index,
                    y: adjustedRowNum
                });
            } else {
                if (fillOccupiedColumn) {
                    occupiedColumn[index] = false;
                }
            }
        });

        adjustedRowNum += (hasGalaxy ? 1 : 2);
    }

    if (last) {
        // adjust coordinates for empty space in columns
        let adjustedIndex = 0;
        const adjustedGalaxies: Position[] = [];
        occupiedColumn.forEach((occupied, index) => {
            galaxies.forEach(galaxy => {
                if (galaxy.x === index) {
                    adjustedGalaxies.push({
                        x: adjustedIndex,
                        y: galaxy.y
                    });
                }
            });
            adjustedIndex += (occupied ? 1 : 2);
        });

        // get all pairs of galaxies
        const galaxyPairs: number[][] = [];
        for (let i=0; i < adjustedGalaxies.length - 1; i++) {
            for (let j=i + 1; j < adjustedGalaxies.length; j++) {
                galaxyPairs.push([i, j]);
            }
        }

        let shortestPathSum = 0;
        galaxyPairs.forEach(pair => {
            let galaxy1: Position;
            let galaxy2: Position;

            galaxy1 = adjustedGalaxies[pair[0]];
            galaxy2 = adjustedGalaxies[pair[1]];
            let xDistance: number = Math.abs(galaxy2.x - galaxy1.x);
            let yDistance: number = Math.abs(galaxy2.y - galaxy1.y);

            let steps = xDistance + yDistance;
            shortestPathSum += steps;
        });

        console.log(`The sum of shortest path between all galaxies: ${shortestPathSum}`);
    }
});
