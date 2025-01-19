import { Buff, RandomKey } from './buffs';

const MoneyBag = (): Buff => {
    return {
        id: 'moneybag',
        name: '这一份是给你的',
        description: '🔍+1。下一次调查额外得知相邻角色的身份',
        icon: [<div key={RandomKey}>💰</div>],
    };
};
export default MoneyBag;
