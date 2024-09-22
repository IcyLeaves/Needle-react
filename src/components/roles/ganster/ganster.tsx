import Role, { RolesType } from '../../../models/role';

const Ganster = (): Role => {
    return {
        id: 'ganster',
        name: '黑帮老大',
        description: '在原地生成一个会不断走动的🦹‍♂️',
        color: '#bcaaa4',
        type: RolesType.DARK,
    };
};
export default Ganster;
