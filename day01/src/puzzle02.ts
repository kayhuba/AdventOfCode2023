console.log("Day 01, Puzzle 02!")

import lineReader from "line-reader";

const map = new Map<string, string>([
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"]
]);
let sum: number = 0;

const convertDigits = (digit: string): string => {
    if (map.has(digit)) {
        // @ts-ignore
        return map.get(digit);
    }

    return digit;
};

let count = 0;
lineReader.eachLine("./input/input.txt", (line, last) => {
    let firstMatch: string = "";
    let lastMatch: string = "";
    for (let i=0; i < line.length; i++) {
        const remainder = line.substring(i);
        const match = remainder.match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/);
        if (match) {
            if (!firstMatch) {
                firstMatch = match[1];
            } else {
                lastMatch = match[1];
            }
        }
    }

    if (!lastMatch) {
        lastMatch = firstMatch;
    }

    count++;
    const firstDigit: string = firstMatch;
    const lastDigit: string = lastMatch;

    const combined: string = convertDigits(firstDigit) + convertDigits(lastDigit);
    console.log(`${count}: firstDigit ${firstDigit}, lastDigit ${lastDigit} combined ${combined}`);
    sum += parseInt(combined);

    if (last) {
        console.log(`Sum: ${sum}`);
    }
});
