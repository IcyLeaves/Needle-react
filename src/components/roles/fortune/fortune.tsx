import Role, { RolesType } from '../../../models/role';

const Fortune = ():Role => {
    return {
        id: 'fortune',
        name: '赏金猎人',
        description: '使一个还未现身的角色获得💰',
        color: '#e64a19',
        type: RolesType.LIGHT,
    };
};

export default Fortune;
