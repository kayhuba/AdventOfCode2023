console.log("Day 07, Puzzle 02!")

import lineReader from "line-reader";

const cardValues = {
    "J": 1, // J now weakest card
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "Q": 12,
    "K": 13,
    "A": 14
};

const cardCountTemplate = {
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "T": 0,
    "J": 0,
    "Q": 0,
    "K": 0,
    "A": 0
};

enum HandType {
    FIVE_OF_A_KIND,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    THREE_OF_A_KIND,
    TWO_PAIR,
    ONE_PAIR,
    HIGH_CARD
}

interface HandBid {
    hand: string,
    sortedHand: string,
    handType: HandType,
    bid: number
}

const handBids: HandBid[] = [];

lineReader.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const handBidRaw = line.split(" ");
        const sortedHand = handBidRaw[0]
            .split("")
            // @ts-ignore
            .sort((a, b) => cardValues[b] - cardValues[a])
            .join("");

        const cardCount = new Map<string, number>();
        sortedHand.split("").forEach(card => {
            const cardCountFound = cardCount.get(card);
            if (cardCountFound !== undefined) {
                cardCount.set(card, cardCountFound + 1);
            } else {
                cardCount.set(card, 1);
            }
        });
        let sortedCardCount = [...cardCount.entries()].sort((a, b) => b[1] - a[1]);

        // puzzle 2 twist: We need to add the count for J cards to the highest value card count
        const jokerCardCount = sortedCardCount.filter(cardCount => cardCount[0] === "J").reduce((val, current) => current[1], 0);

        if (jokerCardCount > 0) {
            // special cases:
            // 1. we have only joker cards -> don't do anything (it's just a FIVE OF A KIND)
            // 2. we have 3 or 4 joker cards -> add them to the _second_ best card (making them the best)
            if (sortedCardCount[0][0] === "J") {
                if (sortedCardCount[0][1] < 5) {
                    sortedCardCount[1][1] += jokerCardCount;
                    sortedCardCount = sortedCardCount.filter(cardCount => cardCount[0] !== "J");
                }
            } else {
                sortedCardCount[0][1] += jokerCardCount;
                sortedCardCount = sortedCardCount.filter(cardCount => cardCount[0] !== "J");
            }
        }

        let handType: HandType;
        if (sortedCardCount[0][1] === 5) {
            handType = HandType.FIVE_OF_A_KIND;
        } else if (sortedCardCount[0][1] === 4) {
            handType = HandType.FOUR_OF_A_KIND;
        } else if (sortedCardCount[0][1] === 3) {
            if (sortedCardCount[1][1] === 2) {
                handType = HandType.FULL_HOUSE;
            } else {
                handType = HandType.THREE_OF_A_KIND;
            }
        } else if (sortedCardCount[0][1] === 2) {
            if (sortedCardCount[1][1] === 2) {
                handType = HandType.TWO_PAIR;
            } else {
                handType = HandType.ONE_PAIR;
            }
        } else {
            handType = HandType.HIGH_CARD;
        }

        handBids.push({
            hand: handBidRaw[0],
            sortedHand: sortedHand,
            handType: handType,
            bid: parseInt(handBidRaw[1])
        });
    }

    if (last) {
        handBids.sort((a, b) => {
            if (a.handType !== b.handType) {
                return a.handType.valueOf() - b.handType.valueOf();
            }

            // same hand - compare card by card
            const aCards = a.hand.split("");
            const bCards = b.hand.split("");
            for (let i=0; i < aCards.length; i++) {
                // @ts-ignore
                if (cardValues[aCards[i]] !== cardValues[bCards[i]]) {
                    // @ts-ignore
                    return cardValues[bCards[i]] - cardValues[aCards[i]];
                }
            }

            return 0;
        }).reverse();

        const totalWinnings = handBids.reduce((totalWinning, handBid, index) => totalWinning += handBid.bid * (index + 1), 0);

        console.log(`Total winnings are: ${totalWinnings}`);
    }
});
