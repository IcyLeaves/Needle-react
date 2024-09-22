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
    onRevealed?: AnyFunction;
    onBeforeRevealed?: AnyFunction;
    onActivating?: AnyFunction;
};

export default Role;
export { RolesType };
