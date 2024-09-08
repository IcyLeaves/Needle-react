import Role from './role';

type SpotVisible = 'HIDDEN' | 'VISIBLE' | 'REVEALED';
type SpotStatus = 'IDLE' | 'LOCKED';

type Spot = {
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

export default Spot;
