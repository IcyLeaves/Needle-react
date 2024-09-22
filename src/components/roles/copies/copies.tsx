import Role, { RolesType } from '../../../models/role';
const Copies = (): Role => {
    return {
        id: 'copies',
        name: '替身',
        description:
            '目标将要现身时，会和目标交换位置并代替他现身。如果是这样，标出目标的方位',
        color: '#80cbc4',
        type: RolesType.DARK,
    };
};
export default Copies;
