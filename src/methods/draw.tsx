class Deck<T> {
    private deck: T[];

    constructor(deck: T[]) {
        this.deck = deck;

        this.shuffle();
    }

    private shuffle(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    public draw(): T | undefined {
        return this.deck.pop();
    }
}

export default Deck;
