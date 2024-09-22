import Role, { RolesType } from '../../../models/role';

const Killer = (): Role => {
    return {
        id: 'killer',
        name: '杀手',
        description: '现身后，后三次调查如果使目标现身，反而输掉游戏',
        color: '#ffe082',
        type: RolesType.DARK,
    };
};
export default Killer;
