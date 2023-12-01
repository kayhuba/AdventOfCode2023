"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 01, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
let sum = 0;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    const matches = [...line.matchAll(/\d/g)];
    if (matches) {
        const combined = matches[0][0] + matches[matches.length - 1][0];
        sum += parseInt(combined);
    }
    if (last) {
        console.log(`Sum: ${sum}`);
    }
});
//# sourceMappingURL=puzzle01.js.map