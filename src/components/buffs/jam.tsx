import { Buff, RandomKey } from './buffs';

const Jammed: Buff = {
    id: 'jammed',
    name: '你被干扰啦',
    description: '你被干扰啦',
    icon: <div key={RandomKey}>❓</div>,
};

export default Jammed;
