console.log("Day 09, Puzzle 01!")

import lineReader from "line-reader";

const evaluateNextSequence = (sequence: number[]) =>
    sequence.reduce((newArray, value, index, array) => {
        if (index > 0) {
            newArray.push(value - array[index - 1]);
        }
        return newArray;
    }, [] as number[]);

const allZeroes = (sequence: number[]) =>
    sequence.filter(val => val !== 0).length === 0;

const sequences: number[][] = [];

lineReader.eachLine("./input/input.txt", (line, last) => {
    sequences.push(line.split(" ").map(numRaw => parseInt(numRaw)));

    if (last) {
        let extrapolatedValueSum = 0;
        sequences.forEach(sequence => {
            const sequenceStack: number[][] = [];
            sequenceStack.push(sequence);

            // top down: difference calculation
            do {
                sequence = evaluateNextSequence(sequence);
                sequenceStack.push(sequence);
            } while (!allZeroes(sequence));

            sequenceStack[sequenceStack.length - 1].push(0);

            // bottom up: next value calculation
            const extendedSequences = sequenceStack.reverse();
            for (let i=1; i < sequenceStack.length; i++) {
                sequence = extendedSequences[i];
                const nextValue = sequence[sequence.length - 1] + extendedSequences[i - 1][sequence.length - 1];
                sequence.push(nextValue);
            }

            const extrapolatedVal = extendedSequences[extendedSequences.length - 1][extendedSequences[extendedSequences.length - 1].length - 1];
            extrapolatedValueSum += extrapolatedVal;
        });

        console.log(`Extrapolated value sum: ${extrapolatedValueSum}`);
    }
});
