"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 08, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
})(Direction || (Direction = {}));
let instructions;
const waypoints = new Map();
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    const instructionMatch = line.match(/^[RL]+$/g);
    if (instructionMatch) {
        instructions = instructionMatch[0]
            .split("")
            .map(instruction => instruction === "L" ? Direction.LEFT : Direction.RIGHT);
    }
    const waypointMatch = line.match(/^(\w{3}) = \((\w{3}), (\w{3})\)$/);
    if (waypointMatch) {
        waypoints.set(waypointMatch[1], [waypointMatch[2], waypointMatch[3]]);
    }
    if (last) {
        let steps = 0;
        let index = 0;
        let name = "AAA";
        while (name !== "ZZZ") {
            const current = waypoints.get(name);
            // @ts-ignore
            name = current[instructions[index].valueOf()];
            index++;
            if (index === instructions.length) {
                index = 0;
            }
            steps++;
        }
        console.log(`Steps: ${steps}`);
    }
});
//# sourceMappingURL=puzzle01.js.map