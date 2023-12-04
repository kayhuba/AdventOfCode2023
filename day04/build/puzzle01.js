"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 04, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
const scratchCards = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const regex = /^Card\s+(\d+):((?:\s+\d+)+) \|((?:\s+\d+)+)$/;
        const match = line.match(regex);
        if (match) {
            const cardId = parseInt(match[1]);
            const winningNumbers = match[2].split(" ").filter(raw => raw.trim().length > 0).map(num => parseInt(num));
            const myNumbers = match[3].split(" ").filter(raw => raw.trim().length > 0).map(raw => raw.trim()).map(num => parseInt(num));
            scratchCards.push({
                id: cardId,
                winningNumbers: winningNumbers,
                myNumbers: myNumbers
            });
        }
    }
    if (last) {
        let totalPointsWorth = 0;
        scratchCards.forEach(card => {
            const winningCardSet = new Set();
            card.winningNumbers.forEach(number => winningCardSet.add(number));
            const myWinningNumbers = card.myNumbers.filter(number => winningCardSet.has(number));
            const cardPoints = myWinningNumbers.length > 0 ? Math.pow(2, myWinningNumbers.length - 1) : 0;
            totalPointsWorth += cardPoints;
        });
        console.log(`Total points worth: ${totalPointsWorth}`);
    }
});
//# sourceMappingURL=puzzle01.js.map