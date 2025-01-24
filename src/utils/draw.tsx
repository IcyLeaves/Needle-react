import seedrandom from 'seedrandom';

class Seed {
    public random: seedrandom.PRNG;
    public seed: string;
    constructor(seed: string) {
        this.seed = seed;
        this.random = seedrandom(this.seed);
    }

    public intVal(max: number): number {
        return Math.floor(this.random() * (max + 1));
    }
}

class Deck<T> {
    private deck: T[];
    private seed: string;
    private random: seedrandom.PRNG;

    constructor(deck: T[], seed: string, random?: seedrandom.PRNG) {
        this.deck = deck;
        this.seed = seed;
        if (random) this.random = random;
        else this.random = seedrandom(this.seed);
        this.shuffle();
    }
    private shuffle(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(this.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    public draw(): T | undefined {
        return this.deck.pop();
    }

    public count(): number {
        return this.deck.length;
    }
}

export { Deck, Seed };
