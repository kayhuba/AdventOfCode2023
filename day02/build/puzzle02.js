"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 02, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
const games = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const gameIdMatch = line.match(/Game (\d+): /);
        // @ts-ignore
        const gameId = parseInt(gameIdMatch[1]);
        // @ts-ignore
        const gameDataRaw = line.substring(gameIdMatch[0].length);
        const attemptsRaw = gameDataRaw.split(";");
        const game = { id: gameId, attempts: [] };
        games.push(game);
        attemptsRaw.forEach(attemptRaw => {
            const redGemsMatch = attemptRaw.match(/(\d+) red/);
            const greenGemsMatch = attemptRaw.match(/(\d+) green/);
            const blueGemsMatch = attemptRaw.match(/(\d+) blue/);
            const redGems = redGemsMatch ? parseInt(redGemsMatch[1]) : 0;
            const greenGems = greenGemsMatch ? parseInt(greenGemsMatch[1]) : 0;
            const blueGems = blueGemsMatch ? parseInt(blueGemsMatch[1]) : 0;
            game.attempts.push({
                redGems: redGems,
                greenGems: greenGems,
                blueGems: blueGems
            });
        });
    }
    if (last) {
        let powerSum = 0;
        games.forEach(game => {
            const maxOverAttempts = game.attempts.reduce((max, attempt) => {
                return {
                    redGems: Math.max(max.redGems, attempt.redGems),
                    greenGems: Math.max(max.greenGems, attempt.greenGems),
                    blueGems: Math.max(max.blueGems, attempt.blueGems)
                };
            }, {
                redGems: 0,
                greenGems: 0,
                blueGems: 0
            });
            const powerOfSet = maxOverAttempts.redGems * maxOverAttempts.greenGems * maxOverAttempts.blueGems;
            powerSum += powerOfSet;
        });
        console.log(`Sum of powers: ${powerSum}`);
    }
});
//# sourceMappingURL=puzzle02.js.map