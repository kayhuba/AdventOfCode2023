"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 02, Puzzle 01!");
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
        let idSum = 0;
        games.forEach(game => {
            const possibleAttempts = game.attempts.filter(attempt => attempt.redGems <= 12 && attempt.greenGems <= 13 && attempt.blueGems <= 14);
            if (possibleAttempts.length === game.attempts.length) {
                idSum += game.id;
            }
        });
        console.log(`ID Sum of possible games: ${idSum}`);
    }
});
//# sourceMappingURL=puzzle01.js.map