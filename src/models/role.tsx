import { AnyFunction } from '../components/public/game';

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

export default Role;
export { RolesType };
