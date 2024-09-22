import Role, { RolesType } from '../../../models/role';

const Reporter = (): Role => {
    return {
        id: 'reporter',
        name: '记者',
        description: '现身时，得知周围角色中为光明势力的人数',
        color: '#0288d1',
        type: RolesType.LIGHT,
    };
};
export default Reporter;
