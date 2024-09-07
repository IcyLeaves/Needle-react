import { SpotBoxCss } from '@/components/css/component';

import React from 'react';
import Role from '../../models/role';

const RoleColorCss = (role: Role) => {
    let res: React.CSSProperties = {
        backgroundColor: `${role.color}`,
    };
    return res;
};

const RoleBox: React.FC<{ role: Role }> = props => {
    const { role } = props;
    return <div style={Object.assign(RoleColorCss(role), SpotBoxCss)}></div>;
};

const RoleLabel: React.FC<{ role: Role }> = props => {
    const { role } = props;
    return (
        <span
            style={{
                color: `${role.color}`,
            }}
        >
            <b>{role.name}</b>
        </span>
    );
};
export { RoleBox, RoleLabel };
