import { Buff, RandomKey } from './buffs';

const Pointing = (): Buff => {
    return {
        id: 'copies',
        name: '这次又让他逃了',
        description: '替身保护了目标不被发现，但同样暴露了重要的线索！',
        icon: [
            <div key={RandomKey}>↖️</div>,
            <div key={RandomKey}>⬆️</div>,
            <div key={RandomKey}>↗️</div>,
            <div key={RandomKey}>⬅️</div>,
            <div key={RandomKey}>⚠</div>,
            <div key={RandomKey}>➡️</div>,
            <div key={RandomKey}>↙️</div>,
            <div key={RandomKey}>⬇️</div>,
            <div key={RandomKey}>↘️</div>,
        ],
    };
};

export default Pointing;
