import { Buff, RandomKey } from './buffs';

const SUN = (): Buff => {
    return {
        id: 'sun',
        name: '灵光乍现',
        description:
            '占卜师说他是光明势力，不过如果占卜后人物悄悄发生过移动就说不准了',
        icon: [<div key={RandomKey}>☀️</div>],
    };
};

const MOON = (): Buff => {
    return {
        id: 'moon',
        name: '暗流涌动',
        description:
            '占卜师说他是黑暗势力，不过如果占卜后人物悄悄发生过移动就说不准了',
        icon: [<div key={RandomKey}>🌑</div>],
    };
};
export { SUN, MOON };
