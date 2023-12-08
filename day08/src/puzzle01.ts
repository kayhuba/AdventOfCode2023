console.log("Day 08, Puzzle 01!")

import lineReader from "line-reader";

enum Direction {
    LEFT,
    RIGHT
}

let instructions: Direction[];
const waypoints: Map<string, [string, string]> = new Map<string, [string, string]>();
lineReader.eachLine("./input/input.txt", (line, last) => {
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
