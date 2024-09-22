import Role, { RolesType } from '../../../models/role';

const Volunteer = (): Role => {
    return {
        id: 'volunteer',
        name: '志愿者',
        description: '每当使用最后一个🔍对相邻角色调查时，🔍+ 2',
        color: '#fbc02d',
        type: RolesType.LIGHT,
    };
};
export default Volunteer;
