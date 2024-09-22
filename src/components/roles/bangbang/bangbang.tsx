import Role, { RolesType } from '../../../models/role';

const BangBang = (): Role => {
    return {
        id: 'bangbang',
        name: 'Bang-Bang',
        description: '你的后三次调查变为三次暗杀',
        color: '#f48fb1',
        type: RolesType.DARK,
    };
};
export default BangBang;
