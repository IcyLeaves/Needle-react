import { Buff } from '../components/buffs/buffs';
import { GameDispatches } from '../components/public/game';
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

const SwapSpots = (
    sbs1: SpotBoxState,
    sbs2: SpotBoxState,
): [SpotBoxState, SpotBoxState] => {
    const { x, y, role, visible, status, buffs, attrs } = sbs1;
    sbs1.role = sbs2.role;
    sbs1.visible = sbs2.visible;
    sbs1.status = sbs2.status;
    sbs1.buffs = sbs2.buffs;
    sbs1.attrs = sbs2.attrs;
    sbs2.role = role;
    sbs2.visible = visible;
    sbs2.status = status;
    sbs2.buffs = buffs;
    sbs2.attrs = attrs;

    return [sbs1, sbs2];
};

type SpotBoxProps = {
    boxState: SpotBoxState;

    gameDispatches: GameDispatches;
};

export { SpotStatus, SpotVisible, SwapSpots };
export type { SpotBoxProps, SpotBoxState };
