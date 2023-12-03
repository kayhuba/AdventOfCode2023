"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 03, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
const symbols = [];
const parts = [];
let y = 0;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const regex = /(\d+)|([^.])/g;
        let match;
        while ((match = regex.exec(line)) != null) {
            const x = match.index;
            if (match[1]) {
                parts.push({
                    num: parseInt(match[1]),
                    start: { x: x, y: y },
                    end: { x: x + match[1].length - 1, y: y }
                });
            }
            else if (match[2]) {
                symbols.push({ x: x, y: y });
            }
        }
        y++;
    }
    if (last) {
        const symbolSet = new Set();
        symbols.forEach(symbol => symbolSet.add(`${symbol.y},${symbol.x}`));
        const engineParts = parts.filter(part => {
            // check the line above tha part
            let y = part.start.y - 1;
            for (let x = part.start.x - 1; x <= part.end.x + 1; x++) {
                if (symbolSet.has(`${y},${x}`)) {
                    return true;
                }
            }
            // check current line
            if (symbolSet.has(`${part.start.y},${part.start.x - 1}`)) {
                return true;
            }
            if (symbolSet.has(`${part.end.y},${part.end.x + 1}`)) {
                return true;
            }
            // check the line below tha part
            y = part.start.y + 1;
            for (let x = part.start.x - 1; x <= part.end.x + 1; x++) {
                if (symbolSet.has(`${y},${x}`)) {
                    return true;
                }
            }
            return false;
        });
        let partNumSum = engineParts.reduce((sum, part) => sum + part.num, 0);
        console.log(`Sum of partnumbers: ${partNumSum}`);
    }
});
//# sourceMappingURL=puzzle01.js.map