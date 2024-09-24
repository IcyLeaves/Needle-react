import { Buff } from '../components/buffs/buffs';
import { GameDispatches, GameState } from '../components/public/game';
import Role from './role';

enum SpotVisible {
    HIDDEN = 'HIDDEN',
    VISIBLE = 'VISIBLE',
    REVEALED = 'REVEALED',
}

enum SpotStatus {
    IDLE = 'IDLE',
    LOCKED = 'LOCKED',
}
// type Listener = (gameState: GameState, x: number, y: number) => GameState;
type SpotBoxState = {
    // x: row id
    x: number;
    // y: col id
    y: number;
    // role: Role
    role: Role;
    // visible: HIDDEN, VISIBLE, REVEALED
    visible: SpotVisible;
    // status: IDLE, LOCKED
    status: SpotStatus;
    // buffs
    buffs: Map<string, Buff>;
    // attrs
    attrs?: Map<string, any>;
};

type SpotBoxProps = {
    boxState: SpotBoxState;

    gameDispatches: GameDispatches;
};

export { SpotStatus, SpotVisible };
export type { SpotBoxProps, SpotBoxState };
