import seedrandom from 'seedrandom';

class Deck<T> {
    private deck: T[];
    private seed: string;

    constructor(deck: T[], seed: string) {
        this.deck = deck;
        this.seed = seed;
        this.shuffle();
    }

    private shuffle(): void {
        const random = seedrandom(this.seed);
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    public draw(): T | undefined {
        return this.deck.pop();
    }
}

export default Deck;
