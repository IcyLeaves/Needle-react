import { Buff, RandomKey } from './buffs';

const Jammed = (): Buff => {
    return {
        id: 'jammed',
        name: '你受到了干扰',
        description: '再调查一次吧！注意相邻角色中至少有一个干扰者',
        icon: [<div key={RandomKey}>❓</div>],
    };
};
export default Jammed;
