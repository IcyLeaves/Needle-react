import { Buff, RandomKey } from './buffs';
const Report = (cnt: number): Buff => {
    return {
        id: 'report',
        name: '采访完毕',
        description: `“在我周围有 ${cnt} 个光明势力的角色。”——前方记者报道`,
        icon: [
            <div key={RandomKey}>0️⃣</div>,
            <div key={RandomKey}>1️⃣</div>,
            <div key={RandomKey}>2️⃣</div>,
            <div key={RandomKey}>3️⃣</div>,
            <div key={RandomKey}>4️⃣</div>,
            <div key={RandomKey}>5️⃣</div>,
            <div key={RandomKey}>6️⃣</div>,
            <div key={RandomKey}>7️⃣</div>,
            <div key={RandomKey}>8️⃣</div>,
        ],
    };
};
export { Report };
