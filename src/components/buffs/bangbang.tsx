import { Buff, RandomKey } from './buffs';

const Wasted = (): Buff => {
    return {
        id: 'wasted',
        name: '安息吧',
        description: `死人是不会说话的`,
        icon: [<div key={RandomKey}>💥</div>],
    };
};
export { Wasted };
