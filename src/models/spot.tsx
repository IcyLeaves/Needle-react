import { Dispatch } from 'react';
import { GameState } from '../components/public/game';
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
};

type SpotBoxProps = {
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

    gameState?: GameState;
    setGameState?: Dispatch<GameState>;

    infoRoles?: Role[];
    setInfoRoles?: Dispatch<Role[]>;
};
export { SpotStatus, SpotVisible };
export type { SpotBoxProps, SpotBoxState };
