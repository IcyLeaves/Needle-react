import Role, { RolesType } from '../../../models/role';

const Augur = (): Role => {
    return {
        id: 'augur',
        name: '占卜师',
        description: '现身时，随机占卜一个2x2的区域，得知每个人的势力',
        color: '#303f9f',
        type: RolesType.LIGHT,
    };
};
export default Augur;
