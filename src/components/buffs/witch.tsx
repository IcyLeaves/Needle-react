import { Buff, RandomKey } from './buffs';

const Cursing = (): Buff => {
    return {
        id: 'cursing',
        name: '你被女巫诅咒了',
        description:
            '现在如果碰到黑暗势力的话，🔍就会变成1个，同时你身上的诅咒全部失效',
        icon: [<div key={RandomKey}>2️⃣</div>, <div key={RandomKey}>1️⃣</div>],
    };
};
export default Cursing;
