import { AnyFunction } from '../components/public/game';
import { SpotBoxState, SpotStatus, SpotVisible } from './spot';

enum RolesType {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}
type Role = {
    id: string;
    color: string;
    name: string;
    description: string;
    type: RolesType;
    onFlip?: AnyFunction;
    onBeforeRevealed?: AnyFunction;
    onRevealed?: AnyFunction;
    onActivating?: AnyFunction;
    onRoundOver?: AnyFunction;
};

const DefaultLightRole: Role = {
    id: '_light',
    color: 'white',
    name: '',
    description: '',
    type: RolesType.LIGHT,
};

const DefaultDarkRole: Role = {
    id: '_dark',
    color: 'black',
    name: '',
    description: '',
    type: RolesType.DARK,
};

const DefaultSpotBoxState: SpotBoxState = {
    x: -1,
    y: -1,
    role: DefaultLightRole,
    visible: SpotVisible.HIDDEN,
    status: SpotStatus.IDLE,
    buffs: new Map(),
    attrs: new Map(),
};

export default Role;
export { DefaultDarkRole, DefaultLightRole, DefaultSpotBoxState, RolesType };
