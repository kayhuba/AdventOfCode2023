"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 09, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
const evaluateNextSequence = (sequence) => sequence.reduce((newArray, value, index, array) => {
    if (index > 0) {
        newArray.push(value - array[index - 1]);
    }
    return newArray;
}, []);
const allZeroes = (sequence) => sequence.filter(val => val !== 0).length === 0;
const sequences = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    sequences.push(line.split(" ").map(numRaw => parseInt(numRaw)));
    if (last) {
        let extrapolatedValueSum = 0;
        sequences.forEach(sequence => {
            const sequenceStack = [];
            sequenceStack.push(sequence);
            // top down: difference calculation
            do {
                sequence = evaluateNextSequence(sequence);
                sequenceStack.push(sequence);
            } while (!allZeroes(sequence));
            sequenceStack[sequenceStack.length - 1].unshift(0);
            // bottom up: previous value calculation
            const extendedSequences = sequenceStack.reverse();
            for (let i = 1; i < sequenceStack.length; i++) {
                sequence = extendedSequences[i];
                const previousValue = sequence[0] - extendedSequences[i - 1][0];
                sequence.unshift(previousValue);
            }
            const extrapolatedVal = extendedSequences[extendedSequences.length - 1][0];
            extrapolatedValueSum += extrapolatedVal;
        });
        console.log(`Extrapolated value sum: ${extrapolatedValueSum}`);
    }
});
//# sourceMappingURL=puzzle02.js.map