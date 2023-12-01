"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 01, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
const map = new Map([
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
let sum = 0;
const convertDigits = (digit) => {
    if (map.has(digit)) {
        // @ts-ignore
        return map.get(digit);
    }
    return digit;
};
let count = 0;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    let firstMatch = "";
    let lastMatch = "";
    for (let i = 0; i < line.length; i++) {
        const remainder = line.substring(i);
        const match = remainder.match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/);
        if (match) {
            if (!firstMatch) {
                firstMatch = match[1];
            }
            else {
                lastMatch = match[1];
            }
        }
    }
    if (!lastMatch) {
        lastMatch = firstMatch;
    }
    count++;
    const firstDigit = firstMatch;
    const lastDigit = lastMatch;
    const combined = convertDigits(firstDigit) + convertDigits(lastDigit);
    console.log(`${count}: firstDigit ${firstDigit}, lastDigit ${lastDigit} combined ${combined}`);
    sum += parseInt(combined);
    if (last) {
        console.log(`Sum: ${sum}`);
    }
});
//# sourceMappingURL=puzzle02.js.map