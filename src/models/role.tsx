import { AnyFunction } from '../components/public/game';

type Role = {
    id: string;
    color: string;
    name: string;
    description: string;
    onRevealed?: AnyFunction;
    onBeforeRevealed?: AnyFunction;
};

export default Role;
