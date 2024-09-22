type Buff = {
    id: string;
    name: string;
    icon: JSX.Element[];
    description: string;
    idx?: number;
};

const RandomKey: string = Math.random().toString(36).substring(7);

export { RandomKey };
export type { Buff };

type Buffs = Set<Buff>;

class BuffSet {
    private buffs: Map<string, Buff> = new Map();

    public has(id: string): boolean {
        return this.buffs.has(id);
    }

    public delete(id: string): boolean {
        return this.buffs.delete(id);
    }

    public push(buff: Buff): void {
        this.buffs.set(buff.id, buff);
    }
}
