console.log("Day 08, Puzzle 02!")

import lineReader from "line-reader";

enum Direction {
    LEFT,
    RIGHT
}

const startPoints: string[] = [];
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
        if (waypointMatch[1].endsWith("A")) {
            startPoints.push(waypointMatch[1]);
        }
    }

    if (last) {
        // current approach doesn't work.
        // what we should do instead:
        // * for all names, for all nodes ending with Z, find out how many steps it takes to get there
        // * intersect the results (i.e. for each name, there must be a matching number of steps with all others)
        //   -> find the least common multiple
        const endPointFound = new Set<string>();
        const stepsPerStartPoint = startPoints.map(name => {
            let stepsFound: number[] = [];
            let steps = 0;
            let index = 0;

            while (endPointFound.size !== startPoints.length) {
                const current = waypoints.get(name);
                // @ts-ignore
                const newName = current[instructions[index].valueOf()];

                steps++;
                if (newName.endsWith("Z")) {
                    if (endPointFound.has(name + instructions[index])) {
                        break;
                    }
                    stepsFound.push(steps);
                    endPointFound.add(name + instructions[index]);
                }
                name = newName;

                index++;
                if (index === instructions.length) {
                    index = 0;
                }
            }
            return stepsFound;
        });

        const gcd = (a: bigint, b: bigint) => {
            while (b !== 0n) {
                let i = b;
                b = a % b;
                a = i;
            }
            return a;
        };

        const lcm = (a: bigint, b: bigint) => {
            return (a * b) / gcd(a, b);
        };

        // this is wrong - think about it again
        const steps = stepsPerStartPoint
            .flat()
            .reduce((leastCommonMultiple, steps) => lcm(leastCommonMultiple, BigInt(steps)), 1n);
        console.log(`Steps: ${steps}`);
    }
});
