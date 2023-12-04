console.log("Day 04, Puzzle 02!")

import lineReader from "line-reader";

interface ScratchCard {
    id: number,
    winningNumbers: number[],
    myNumbers: number[],
    instances: number
}

const scratchCards: ScratchCard[] = [];
lineReader.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const regex = /^Card\s+(\d+):((?:\s+\d+)+) \|((?:\s+\d+)+)$/;
        const match = line.match(regex);

        if (match) {
            const cardId = parseInt(match[1]);
            const winningNumbers: number[] = match[2].split(" ").filter(raw => raw.trim().length > 0).map(num => parseInt(num));
            const myNumbers: number[] = match[3].split(" ").filter(raw => raw.trim().length > 0).map(raw => raw.trim()).map(num => parseInt(num));
            scratchCards.push({
                id: cardId,
                winningNumbers: winningNumbers,
                myNumbers: myNumbers,
                instances: 1
            });
        }
    }

    if (last) {
        scratchCards.forEach(card => {
            const winningCardSet = new Set<number>();
            card.winningNumbers.forEach(number => winningCardSet.add(number));
            const myWinningNumbers = card.myNumbers.filter(number => winningCardSet.has(number));
            for (let i= card.id; i < scratchCards.length && i < card.id + myWinningNumbers.length; i++) {
                scratchCards[i].instances+=card.instances;
            }
        });
        const totalCardInstances = scratchCards.reduce((sum, card) => sum += card.instances, 0);

        console.log(`Total card instances: ${totalCardInstances}`);
    }
});
