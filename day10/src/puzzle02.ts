console.log("Day 10, Puzzle 02!")

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

interface Stats {
    leftTurns: number,
    rightTurns: number,
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
    if (maze[startPoint.y - 1] !== undefined && maze[startPoint.y - 1][startPoint.x] !== undefined &&
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

function yOffsetFromDirection(direction: Direction): number {
    if (direction === Direction.DOWN) {
        return 1;
    } else if (direction === Direction.UP) {
        return -1;
    }
    return 0;
}

function xOffsetFromDirection(direction: Direction): number {
    if (direction === Direction.RIGHT) {
        return 1;
    } else if (direction === Direction.LEFT) {
        return -1;
    }
    return 0;
}

function oppositeDirection(direction: Direction): Direction {
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
}

function nextPosition([currentPos, currentDir]: [Position, Direction]): [Position, Direction] {
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
}

function updateTurns(originDirection: Direction, newDirection: Direction, stats: Stats) {
    switch(originDirection) {
        case Direction.UP:
            if (newDirection === Direction.LEFT) {
                stats.rightTurns++;
            } else if (newDirection === Direction.RIGHT) {
                stats.leftTurns++;
            }
            return;
        case Direction.RIGHT:
            if (newDirection === Direction.UP) {
                stats.rightTurns++;
            } else if (newDirection === Direction.DOWN) {
                stats.leftTurns++;
            }
            return;
        case Direction.DOWN:
            if (newDirection === Direction.RIGHT) {
                stats.rightTurns++;
            } else if (newDirection === Direction.LEFT) {
                stats.leftTurns++;
            }
            return;
        case Direction.LEFT:
            if (newDirection === Direction.DOWN) {
                stats.rightTurns++;
            } else if (newDirection === Direction.UP) {
                stats.leftTurns++;
            }
            return;
    }
}

function getLoop(startPoint: Position): [[Position, Direction][], Stats] {
    let [currentPosition, currentDirection]: [Position, Direction] = [startPoint, maze[startPoint.y][startPoint.x]?.connections[0] as Direction];
    const visitedPositions: [Position, Direction][] = [[currentPosition, currentDirection]];
    const stats: Stats = {
        leftTurns: 0,
        rightTurns: 0,
    };

    do {
        const originDirection = currentDirection;
        [currentPosition, currentDirection] = nextPosition([currentPosition, currentDirection]);
        visitedPositions.push([currentPosition, currentDirection]);
        updateTurns(originDirection, oppositeDirection(currentDirection), stats);
    } while (currentPosition.y !== startPoint.y || currentPosition.x !== startPoint.x);

    return [visitedPositions, stats];
}

function markTile(point: Position, type: TileType, mazeTiles: TileType[][], width: number, height: number) {
    if (point.x < 0 || point.y < 0 || point.x >= width || point.y >= height) {
        return;
    }

    if (mazeTiles[point.y][point.x] === undefined) {
        mazeTiles[point.y][point.x] = type;
    }
}

enum TileType {
    ENCLOSED,
    NOT_ENCLOSED,
    LOOP
}

enum Orientation {
    CW,
    CCW
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
        let enclosedTiles: number = 0;
        maze[startPoint.y][startPoint.x] = evalStartPointPipeType();

        const [, stats] = getLoop(startPoint);
        const mazeTiles: TileType[][] = [];
        maze.forEach(line => mazeTiles.push([]));

        // depending on the amount of left or right turns our run was clockwise or counter clockwise
        const orientation: Orientation = stats.rightTurns > stats.leftTurns ? Orientation.CW : Orientation.CCW;
        let runningDirection: Direction = oppositeDirection(maze[startPoint.y][startPoint.x]?.connections[0] as Direction);

        let [currentPosition, currentDirection]: [Position, Direction] = [startPoint, maze[startPoint.y][startPoint.x]?.connections[0] as Direction];
        markTile(currentPosition, TileType.LOOP, mazeTiles, maze[0].length, maze.length);
        do {
            const originDirection = currentDirection;
            const oldPosition = currentPosition;
            [currentPosition, currentDirection] = nextPosition([currentPosition, currentDirection]);
            markTile(currentPosition, TileType.LOOP, mazeTiles, maze[0].length, maze.length);

            const oppositeCurrentDirection = oppositeDirection(currentDirection);
            mazeTiles[currentPosition.y][currentPosition.x] = TileType.LOOP;

            const dummyStats: Stats = {leftTurns: 0, rightTurns: 0};
            updateTurns(originDirection, oppositeCurrentDirection, dummyStats);

            if (dummyStats.rightTurns > 0) {
                switch(runningDirection) {
                    case Direction.DOWN:
                        runningDirection = Direction.LEFT;
                        break;
                    case Direction.LEFT:
                        runningDirection = Direction.UP;
                        break;
                    case Direction.UP:
                        runningDirection = Direction.RIGHT;
                        break;
                    case Direction.RIGHT:
                        runningDirection = Direction.DOWN;
                        break;
                }
            } else if (dummyStats.leftTurns > 0) {
                switch(runningDirection) {
                    case Direction.DOWN:
                        runningDirection = Direction.RIGHT;
                        break;
                    case Direction.RIGHT:
                        runningDirection = Direction.UP;
                        break;
                    case Direction.UP:
                        runningDirection = Direction.LEFT;
                        break;
                    case Direction.LEFT:
                        runningDirection = Direction.DOWN;
                        break;
                }
            }

            const orientationAdjustedDirection = orientation == Orientation.CW ? runningDirection : oppositeDirection(runningDirection);
            const pipe: Pipe | undefined = maze[oldPosition.y][oldPosition.x];
            if (pipe !== undefined) {
                if (pipe.type === "|" || pipe.type === "-") {
                    switch(orientationAdjustedDirection) {
                        case Direction.RIGHT:
                            markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            break;
                        case Direction.DOWN:
                            markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            break;
                        case Direction.LEFT:
                            markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            break;
                        case Direction.UP:
                            markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                            break;
                    }
                } else if (pipe.type === "F") {
                    if (orientationAdjustedDirection === Direction.RIGHT || orientationAdjustedDirection === Direction.UP) {
                        markTile({x: oldPosition.x - 1, y: oldPosition.y - 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    } else if (orientationAdjustedDirection === Direction.LEFT || orientationAdjustedDirection === Direction.DOWN) {
                        markTile({x: oldPosition.x - 1, y: oldPosition.y - 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    }
                } else if (pipe.type === "7") {
                    if (orientationAdjustedDirection === Direction.RIGHT || orientationAdjustedDirection === Direction.DOWN) {
                        markTile({x: oldPosition.x + 1, y: oldPosition.y - 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    } else if (orientationAdjustedDirection === Direction.LEFT || orientationAdjustedDirection === Direction.UP) {
                        markTile({x: oldPosition.x + 1, y: oldPosition.y - 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y - 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    }
                } else if (pipe.type === "L") {
                    if (orientationAdjustedDirection === Direction.LEFT || orientationAdjustedDirection === Direction.UP) {
                        markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x - 1, y: oldPosition.y + 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    } else if (orientationAdjustedDirection === Direction.RIGHT || orientationAdjustedDirection === Direction.DOWN) {
                        markTile({x: oldPosition.x - 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x - 1, y: oldPosition.y + 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    }
                } else if (pipe.type === "J") {
                    if (orientationAdjustedDirection === Direction.LEFT || orientationAdjustedDirection === Direction.DOWN) {
                        markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x + 1, y: oldPosition.y + 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.NOT_ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    } else if (orientationAdjustedDirection === Direction.RIGHT || orientationAdjustedDirection === Direction.UP) {
                        markTile({x: oldPosition.x + 1, y: oldPosition.y}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x + 1, y: oldPosition.y + 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                        markTile({x: oldPosition.x, y: oldPosition.y + 1}, TileType.ENCLOSED, mazeTiles, maze[0].length, maze.length);
                    }
                }
            }
        } while (currentPosition.y !== startPoint.y || currentPosition.x !== startPoint.x);

        // let's see whether we can live without a fill algorithm (that's not quite clear from the examples)
        // [some time later]: our first number was too low - our pattern indicates: Yes, there are holes -> we need to fill...
        mazeTiles.forEach((mazeLine, index) => {
            let startPosition: number | undefined = undefined;
            for (let i=0; i < mazeLine.length; i++) {
                if (mazeLine[i] === TileType.ENCLOSED) {
                    if (startPosition === undefined) {
                        startPosition = i;
                    } else {
                        for (let j=startPosition; j < i; j++) {
                            mazeLine[j] = TileType.ENCLOSED;
                        }
                        startPosition = i;
                    }
                } else if (mazeLine[i] === TileType.LOOP || mazeLine[i] === TileType.NOT_ENCLOSED) {
                    startPosition = undefined;
                }
            }
        });

        // print maze tiles
        console.log("Loop and enclosed / non-enclosed tiles:");

        for (let y = 0; y < maze.length; y++) {
            let printLine = "";
            for (let x = 0; x < maze[0].length; x++) {
                if (mazeTiles[y][x] === undefined) {
                    printLine += ".";
                    continue;
                }

                switch(mazeTiles[y][x]) {
                    case TileType.LOOP:
                        printLine += "X";
                        break;
                    case TileType.ENCLOSED:
                        printLine += "I";
                        break;
                    case TileType.NOT_ENCLOSED:
                        printLine += "O";
                        break;
                }
            }
            console.log(printLine);
        }

        enclosedTiles = mazeTiles.reduce((sum, line) =>
            sum += line.reduce((sum, tile) => sum += (tile === TileType.ENCLOSED) ? 1 : 0, 0)
            , 0);

        console.log(`Amount of tiles enclosed: ${enclosedTiles}`);
    }

    lineCount++;
});
