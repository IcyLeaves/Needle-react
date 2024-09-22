import Role, { RolesType } from '../../../models/role';

const Sheriff = (): Role => {
    return {
        id: 'sheriff',
        name: '警长',
        description: '周围角色全部现身后，将现在的🔍翻倍。然后🔍+2',
        color: '#5d4037',
        type: RolesType.LIGHT,
    };
};
export default Sheriff;
