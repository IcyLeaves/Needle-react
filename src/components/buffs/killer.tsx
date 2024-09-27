import { Buff, RandomKey } from './buffs';

const Killing = (idx?: number): Buff => {
    if (idx === undefined) {
        idx = 0;
    }
    return {
        id: 'killing',
        name: '杀手正在寻找目标',
        description: `后${3 - idx}次调查不要使目标现身，否则目标会被干掉！`,
        icon: [
            <div key={RandomKey}>3️⃣</div>,
            <div key={RandomKey}>2️⃣</div>,
            <div key={RandomKey}>1️⃣</div>,
        ],
        idx,
    };
};

const Killed = (): Buff => {
    return {
        id: 'killed',
        name: '目标死了，任务失败',
        description: ' 很遗憾，你帮杀手找到了目标...',
        icon: [<div key={RandomKey}>💀</div>],
    };
};
export { Killed, Killing };
