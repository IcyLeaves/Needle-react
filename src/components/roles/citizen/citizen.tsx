import Role, { RolesType } from '../../../models/role';

const Citizen = (): Role => {
    return {
        id: 'citizen',
        name: '市民',
        description: '没有任何效果',
        color: '#898989',
        type: RolesType.LIGHT,
    };
};
export default Citizen;
