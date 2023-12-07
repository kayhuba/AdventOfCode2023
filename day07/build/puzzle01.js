"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 07, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 11,
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
var HandType;
(function (HandType) {
    HandType[HandType["FIVE_OF_A_KIND"] = 0] = "FIVE_OF_A_KIND";
    HandType[HandType["FOUR_OF_A_KIND"] = 1] = "FOUR_OF_A_KIND";
    HandType[HandType["FULL_HOUSE"] = 2] = "FULL_HOUSE";
    HandType[HandType["THREE_OF_A_KIND"] = 3] = "THREE_OF_A_KIND";
    HandType[HandType["TWO_PAIR"] = 4] = "TWO_PAIR";
    HandType[HandType["ONE_PAIR"] = 5] = "ONE_PAIR";
    HandType[HandType["HIGH_CARD"] = 6] = "HIGH_CARD";
})(HandType || (HandType = {}));
const handBids = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        const handBidRaw = line.split(" ");
        const sortedHand = handBidRaw[0]
            .split("")
            // @ts-ignore
            .sort((a, b) => cardValues[b] - cardValues[a])
            .join("");
        const cardCount = new Map();
        sortedHand.split("").forEach(card => {
            const cardCountFound = cardCount.get(card);
            if (cardCountFound !== undefined) {
                cardCount.set(card, cardCountFound + 1);
            }
            else {
                cardCount.set(card, 1);
            }
        });
        const sortedCardCount = [...cardCount.entries()].sort((a, b) => b[1] - a[1]);
        let handType;
        if (sortedCardCount[0][1] === 5) {
            handType = HandType.FIVE_OF_A_KIND;
        }
        else if (sortedCardCount[0][1] === 4) {
            handType = HandType.FOUR_OF_A_KIND;
        }
        else if (sortedCardCount[0][1] === 3) {
            if (sortedCardCount[1][1] === 2) {
                handType = HandType.FULL_HOUSE;
            }
            else {
                handType = HandType.THREE_OF_A_KIND;
            }
        }
        else if (sortedCardCount[0][1] === 2) {
            if (sortedCardCount[1][1] === 2) {
                handType = HandType.TWO_PAIR;
            }
            else {
                handType = HandType.ONE_PAIR;
            }
        }
        else {
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
            for (let i = 0; i < aCards.length; i++) {
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
//# sourceMappingURL=puzzle01.js.map