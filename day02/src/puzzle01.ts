console.log("Day 02, Puzzle 01!")

import lineReader from "line-reader";

interface Game {
    id: number;
    attempts: Attempt[];
}

interface Attempt {
    redGems: number;
    greenGems: number;
    blueGems: number;
}

const games: Game[] = [];
lineReader.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const gameIdMatch = line.match(/Game (\d+): /);
        // @ts-ignore
        const gameId = parseInt(gameIdMatch[1]);
        // @ts-ignore
        const gameDataRaw: string = line.substring(gameIdMatch[0].length);
        const attemptsRaw: string[] = gameDataRaw.split(";");
        const game: Game = {id: gameId, attempts: []};
        games.push(game);
        attemptsRaw.forEach(attemptRaw => {
            const redGemsMatch = attemptRaw.match(/(\d+) red/);
            const greenGemsMatch = attemptRaw.match(/(\d+) green/);
            const blueGemsMatch = attemptRaw.match(/(\d+) blue/);

            const redGems: number = redGemsMatch ? parseInt(redGemsMatch[1]) : 0;
            const greenGems: number = greenGemsMatch ? parseInt(greenGemsMatch[1]) : 0;
            const blueGems: number = blueGemsMatch ? parseInt(blueGemsMatch[1]) : 0;

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
