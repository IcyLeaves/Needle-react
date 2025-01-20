import { Buff, RandomKey } from './buffs';

const Bro = (): Buff => {
    return {
        id: 'bro',
        name: '黑帮小弟',
        description: `每次调查后，会移动到随机的相邻格上。黑帮小弟及周围的格子无法调查`,
        icon: [<div key={RandomKey}>🦹‍♂️</div>],
    };
};

const Stop = (): Buff => {
    return {
        id: 'stop',
        name: '危险地带',
        description: '黑帮小弟在周围的话，还是先不要来这里调查比较好',
        icon: [<div key={RandomKey}>⛔</div>],
    };
};
export { Bro, Stop };
