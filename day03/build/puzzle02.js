"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 03, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
const symbols = [];
const parts = [];
let y = 0;
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const regex = /(\d+)|([*])/g;
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
        const symbolMap = new Map();
        symbols.forEach(symbol => symbolMap.set(`${symbol.y},${symbol.x}`, []));
        parts.forEach(part => {
            let partArray;
            // check the line above tha part
            let y = part.start.y - 1;
            for (let x = part.start.x - 1; x <= part.end.x + 1; x++) {
                partArray = symbolMap.get(`${y},${x}`);
                if (partArray !== undefined) {
                    partArray.push(part);
                }
            }
            // check current line
            partArray = symbolMap.get(`${part.start.y},${part.start.x - 1}`);
            if (partArray !== undefined) {
                partArray.push(part);
            }
            partArray = symbolMap.get(`${part.end.y},${part.end.x + 1}`);
            if (partArray !== undefined) {
                partArray.push(part);
            }
            // check the line below tha part
            y = part.start.y + 1;
            for (let x = part.start.x - 1; x <= part.end.x + 1; x++) {
                partArray = symbolMap.get(`${y},${x}`);
                if (partArray !== undefined) {
                    partArray.push(part);
                }
            }
        });
        let gearRatioSum = [...symbolMap.values()].reduce((sum, partNumbers) => {
            if (partNumbers.length > 1) {
                if (partNumbers.length !== 2) {
                    throw new Error("Unexpected count of part numbers");
                }
                sum += partNumbers[0].num * partNumbers[1].num;
            }
            return sum;
        }, 0);
        console.log(`Sum of gearRatios: ${gearRatioSum}`);
    }
});
//# sourceMappingURL=puzzle02.js.map