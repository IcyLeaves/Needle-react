import Role from '../../models/role';
import { SpotVisible } from '../../models/spot';

const SpotBoxCss: React.CSSProperties = {
    border: '2px solid gray',
    borderRadius: '3px',
    margin: '2px',
    height: '3rem',
    width: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minWidth: '3rem',
};

const SpotBoxVisibleCss = (visible: SpotVisible): React.CSSProperties => {
    switch (visible) {
        case SpotVisible.REVEALED:
            return {
                opacity: 1,
            };
        case SpotVisible.VISIBLE:
            return {
                opacity: 0.3,
            };
        case SpotVisible.HIDDEN:
            return {
                backgroundColor: 'white',
            };
        default:
            return {
                opacity: 1,
            };
    }
};
const SpotBoxColorCss = (role: Role): React.CSSProperties => {
    return {
        backgroundColor: `${role.color}`,
    };
};
1;
export { SpotBoxColorCss, SpotBoxCss, SpotBoxVisibleCss };
