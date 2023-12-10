console.log("Day 10, Puzzle 01!")

import lineReader from "line-reader";

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

interface Pipe {
    type: 'F'|'-'|'7'|'|'|'J'|'L',
    connections: Direction[]
}

interface Position {
    x: number,
    y: number
}

function createPipe(type: string): Pipe | undefined {
    switch(type) {
        case 'F':
            return {
                type: type,
                connections: [Direction.DOWN, Direction.RIGHT]
            };
        case '-':
            return {
                type: type,
                connections: [Direction.LEFT, Direction.RIGHT]
            };
        case '7':
            return {
                type: type,
                connections: [Direction.LEFT, Direction.DOWN]
            };
        case '|':
            return {
                type: type,
                connections: [Direction.UP, Direction.DOWN]
            };
        case 'J':
            return {
                type: type,
                connections: [Direction.UP, Direction.LEFT]
            };
        case 'L':
            return {
                type: type,
                connections: [Direction.RIGHT, Direction.UP]
            };
        case '.':
            return undefined;
    }
}

function evalStartPointPipeType(): Pipe {
    // startpoint handling: figure out in which direction we have open pipes
    const matchingDirections: Direction[] = [];

    // above startpoint must be '7', '|' or 'F'
    if (maze[startPoint.y - 1][startPoint.x] !== undefined &&
        // @ts-ignore
        ['7', '|', 'F'].includes(maze[startPoint.y - 1][startPoint.x].type)) {
        matchingDirections.push(Direction.UP);
    }

    // right of startpoint must be '-', 'J' or '7'
    if (maze[startPoint.y][startPoint.x + 1] !== undefined &&
        // @ts-ignore
        ['-', 'J', '7'].includes(maze[startPoint.y][startPoint.x + 1].type)) {
        matchingDirections.push(Direction.RIGHT);
    }

    // below startpoint must be 'J', '|' or 'L'
    if (maze[startPoint.y + 1][startPoint.x] !== undefined &&
        // @ts-ignore
        ['J', '|', 'L'].includes(maze[startPoint.y + 1][startPoint.x].type)) {
        matchingDirections.push(Direction.DOWN);
    }

    // left of startpoint must be '-', 'L' or 'F'
    if (maze[startPoint.y][startPoint.x - 1] !== undefined &&
        // @ts-ignore
        ['-', 'L', 'F'].includes(maze[startPoint.y][startPoint.x - 1].type)) {
        matchingDirections.push(Direction.LEFT);
    }

    let startPointPipe: Pipe;
    switch (matchingDirections[0]) {
        case Direction.UP:
            switch (matchingDirections[1]) {
                case Direction.DOWN:
                    startPointPipe = createPipe('|') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.RIGHT:
                    startPointPipe = createPipe('L') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.LEFT:
                    startPointPipe = createPipe('J') as Pipe;
                    break;
            }
            break;
        case Direction.RIGHT:
            switch (matchingDirections[1]) {
                case Direction.LEFT:
                    startPointPipe = createPipe('-') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.UP:
                    startPointPipe = createPipe('L') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.DOWN:
                    startPointPipe = createPipe('F') as Pipe;
                    break;
            }
            break;
        case Direction.DOWN:
            switch (matchingDirections[1]) {
                case Direction.LEFT:
                    startPointPipe = createPipe('7') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.UP:
                    startPointPipe = createPipe('|') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.RIGHT:
                    startPointPipe = createPipe('F') as Pipe;
                    break;
            }
            break;
        case Direction.LEFT:
            switch (matchingDirections[1]) {
                case Direction.RIGHT:
                    startPointPipe = createPipe('-') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.UP:
                    startPointPipe = createPipe('J') as Pipe;
                    break;
            }
            switch (matchingDirections[1]) {
                case Direction.DOWN:
                    startPointPipe = createPipe('7') as Pipe;
                    break;
            }
            break;
    }

    // @ts-ignore
    return startPointPipe;
}

// arrays:
// y
// x
// pipe
const maze: (Pipe|undefined)[][] = [];
let lineCount: number = 0;
let startPoint: Position;

lineReader.eachLine("./input/input.txt", (line, last) => {
    const piped = line.split("").map((element, index): Pipe | undefined => {
        if (element === "S") {
            startPoint = {x: index, y: lineCount};
            return undefined;
        }

        return createPipe(element);
    });

    maze.push(piped);

    if (last) {
        maze[startPoint.y][startPoint.x] = evalStartPointPipeType();

        const yOffsetFromDirection = (direction: Direction): number => {
            if (direction === Direction.DOWN) {
                return 1;
            } else if (direction === Direction.UP) {
                return -1;
            }
            return 0;
        };

        const xOffsetFromDirection = (direction: Direction): number => {
            if (direction === Direction.RIGHT) {
                return 1;
            } else if (direction === Direction.LEFT) {
                return -1;
            }
            return 0;
        };

        const oppositeDirection = (direction: Direction): Direction => {
            switch(direction) {
                case Direction.LEFT:
                    return Direction.RIGHT;
                case Direction.RIGHT:
                    return Direction.LEFT;
                case Direction.UP:
                    return Direction.DOWN;
                case Direction.DOWN:
                    return Direction.UP;
            }
        };

        const nextPosition = ([currentPos, currentDir]: [Position, Direction]): [Position, Direction] => {
            const pipe = maze[currentPos.y][currentPos.x] as Pipe;
            if (pipe.connections[0] === currentDir) {
                return [{
                    y: currentPos.y + yOffsetFromDirection(pipe.connections[1]),
                    x: currentPos.x + xOffsetFromDirection(pipe.connections[1])
                }, oppositeDirection(pipe.connections[1])];
            } else {
                return [{
                    y: currentPos.y + yOffsetFromDirection(pipe.connections[0]),
                    x: currentPos.x + xOffsetFromDirection(pipe.connections[0])
                }, oppositeDirection(pipe.connections[0])];
            }
        };

        let current: [Position, Direction] = [startPoint, maze[startPoint.y][startPoint.x]?.connections[0] as Direction];
        let steps = 0;

        do {
            current = nextPosition(current);
            steps++;
        } while (current[0].y !== startPoint.y || current[0].x !== startPoint.x);

        console.log(`Steps farthest away from start: ${steps / 2}`);
    }

    lineCount++;
});
